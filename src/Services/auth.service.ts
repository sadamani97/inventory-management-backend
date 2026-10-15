import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { sequelize } from "../config/db.js";
import type { LoginInput, SignupInput, CreateUserInput, UpdateUserInput } from "../Valitations/auth.validation.js";

const SALT_ROUNDS = 10;

export const signupService = async (data: SignupInput) => {
  const email = (data.email || "").trim().toLowerCase();
  const { password, firstname, lastname } = data;

  // 1. Check if user already exists (case-insensitive)
  const existingUser = await User.findOne({
    where: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already registered",
    };
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. Create user
  const newUser = await User.create({
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    email,
    password: hashedPassword,
  });

  const insertId = newUser.id;

  // 4. Sign JWT
  const token = jwt.sign(
    { id: insertId, email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );

  return {
    success: true,
    message: "User signed up successfully",
    token,
    data: {
      id: insertId,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    },
  };
};

export const loginService = async (data: LoginInput) => {
  const email = (data.email || "").trim().toLowerCase();
  const { password } = data;

  // 1. Find user by email (case-insensitive)
  const user = await User.findOne({
    where: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // 2. Compare password
  const hashedPassword = user.getDataValue("password");
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // 3. Sign JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );

  return {
    success: true,
    message: "User logged in successfully",
    token,
    data: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  };
};

export const getAllUsersService = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });
    return {
      success: true,
      data: users
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error fetching users"
    };
  }
};

export const getUserByIdService = async (id: number) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }
    return {
      success: true,
      data: user
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error fetching user"
    };
  }
};

export const createUserService = async (data: CreateUserInput) => {
  try {
    const email = (data.email || "").trim().toLowerCase();
    const { password, firstname, lastname } = data;
    const existingUser = await User.findOne({
      where: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
    });
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered"
      };
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email,
      password: hashedPassword
    });
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error creating user"
    };
  }
};

export const updateUserService = async (id: number, data: UpdateUserInput) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    if (data.email && data.email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const email = data.email.trim().toLowerCase();
      const existingUser = await User.findOne({
        where: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
      });
      if (existingUser) {
        return {
          success: false,
          message: "Email already in use"
        };
      }
    }

    const updatedData: any = { ...data };
    if (data.email) {
      updatedData.email = data.email.trim().toLowerCase();
    }
    if (data.firstname) {
      updatedData.firstname = data.firstname.trim();
    }
    if (data.lastname) {
      updatedData.lastname = data.lastname.trim();
    }
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    await user.update(updatedData);

    return {
      success: true,
      message: "User updated successfully",
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error updating user"
    };
  }
};

export const deleteUserService = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }
    await user.destroy();
    return {
      success: true,
      message: "User deleted successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error deleting user"
    };
  }
};