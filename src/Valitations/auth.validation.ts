import {z} from "zod";


export const signupSchema = z.object({
    firstname: z.string().min(3, "User must have 3 characters").max(50, "User can have maximum 50 characters").trim(),
    lastname: z.string().min(1, "User must have at least 1 character").max(50, "User can have maximum 50 characters").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(8, "Password must have at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character").trim(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(8, "Password must have at least 8 characters").trim()
});

export type SignupInput = z.infer<typeof signupSchema>; 
export type LoginInput = z.infer<typeof loginSchema>; 

export const createUserSchema = z.object({
    firstname: z.string().min(3, "User must have 3 characters").max(50, "User can have maximum 50 characters").trim(),
    lastname: z.string().min(1, "User must have at least 1 character").max(50, "User can have maximum 50 characters").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(8, "Password must have at least 8 characters").trim(),
});

export const updateUserSchema = z.object({
    firstname: z.string().min(3, "User must have 3 characters").max(50, "User can have maximum 50 characters").trim().optional(),
    lastname: z.string().min(1, "User must have at least 1 character").max(50, "User can have maximum 50 characters").trim().optional(),
    email: z.string().email("Invalid email address").trim().optional(),
    password: z.string().min(8, "Password must have at least 8 characters").trim().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;