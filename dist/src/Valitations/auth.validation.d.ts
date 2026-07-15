import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const createUserSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    firstname: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
//# sourceMappingURL=auth.validation.d.ts.map