import { loginSchema, signupSchema, createUserSchema, updateUserSchema } from "../Valitations/auth.validation.js";
import { signupService, loginService, getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "../Services/auth.service.js";
export const SignupController = async (req, res) => {
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten()
            });
        }
        const response = await signupService(result.data);
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Signup error occurred:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const LoginController = async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten()
            });
        }
        const response = await loginService(result.data);
        if (!response.success) {
            return res.status(400).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Login error occurred:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const GetUsersController = async (req, res) => {
    try {
        const response = await getAllUsersService();
        if (!response.success) {
            return res.status(500).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error in GetUsersController:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const GetUserByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const response = await getUserByIdService(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error in GetUserByIdController:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const CreateUserController = async (req, res) => {
    try {
        const result = createUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten()
            });
        }
        const response = await createUserService(result.data);
        if (!response.success) {
            return res.status(400).json(response);
        }
        res.status(201).json(response);
    }
    catch (error) {
        console.error("Error in CreateUserController:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const UpdateUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const result = updateUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten()
            });
        }
        const response = await updateUserService(id, result.data);
        if (!response.success) {
            return res.status(400).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error in UpdateUserController:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
export const DeleteUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const response = await deleteUserService(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error in DeleteUserController:", error);
        res.status(500).json({ message: "Internal server error", details: error instanceof Error ? error.message : String(error) });
    }
};
//# sourceMappingURL=auth.controller.js.map