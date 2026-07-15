import { User } from "../models/User.js";
import type { LoginInput, SignupInput, CreateUserInput, UpdateUserInput } from "../Valitations/auth.validation.js";
export declare const signupService: (data: SignupInput) => Promise<{
    success: boolean;
    message: string;
    token?: never;
    data?: never;
} | {
    success: boolean;
    message: string;
    token: string;
    data: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
}>;
export declare const loginService: (data: LoginInput) => Promise<{
    success: boolean;
    message: string;
    token?: never;
    data?: never;
} | {
    success: boolean;
    message: string;
    token: string;
    data: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
}>;
export declare const getAllUsersService: () => Promise<{
    success: boolean;
    data: User[];
    message?: never;
} | {
    success: boolean;
    message: string;
    data?: never;
}>;
export declare const getUserByIdService: (id: number) => Promise<{
    success: boolean;
    message: string;
    data?: never;
} | {
    success: boolean;
    data: User;
    message?: never;
}>;
export declare const createUserService: (data: CreateUserInput) => Promise<{
    success: boolean;
    message: string;
    data?: never;
} | {
    success: boolean;
    message: string;
    data: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
}>;
export declare const updateUserService: (id: number, data: UpdateUserInput) => Promise<{
    success: boolean;
    message: string;
    data?: never;
} | {
    success: boolean;
    message: string;
    data: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
}>;
export declare const deleteUserService: (id: number) => Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map