import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.config.js";
import { env } from "../config/env.js";
const SALT_ROUNDS = 10;
export const signupService = async (data) => {
    const { password, ...rest } = data;
    const existingUser = await prisma.user.findUnique({
        where: { email: rest.email },
    });
    if (existingUser) {
        return {
            success: false,
            message: "Email already registered",
        };
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await prisma.user.create({
        data: {
            ...rest,
            password: hashedPassword,
        },
    });
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    return {
        success: true,
        message: "User signed up successfully",
        token,
        data: {
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
        },
    };
};
export const loginService = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid email or password",
        };
    }
    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
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
//# sourceMappingURL=auth.service.js.map