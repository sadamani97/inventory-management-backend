import type { LoginInput, SignupInput } from "../Valitations/auth.validation.js";
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
//# sourceMappingURL=auth.service.d.ts.map