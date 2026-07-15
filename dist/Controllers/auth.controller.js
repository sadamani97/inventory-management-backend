import { loginSchema, signupSchema } from "../Valitations/auth.validation.js";
import { signupService, loginService } from "../Services/auth.service.js";
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
        res.status(500).json({ message: "Internal server error" });
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
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=auth.controller.js.map