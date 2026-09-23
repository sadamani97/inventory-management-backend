
import type {Request,Response, NextFunction } from "express";
import type {ZodTypeAny} from 'zod';

export const validate = (schema:ZodTypeAny)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req.body ?? {});
    if(!result.success){
        const fieldErrors = result.error.flatten().fieldErrors;
        const hasFieldErrors = Object.keys(fieldErrors).length > 0;
        return res.status(400).json({
            success: false,
            message: "validation Fail",
            error: hasFieldErrors ? fieldErrors : result.error.issues
        });
    }
    req.body = result.data;
    next()
}
};