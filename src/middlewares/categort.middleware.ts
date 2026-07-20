import type { Request, Response, NextFunction } from "express";
import { createCategorySchema,updateCategorySchema } from "../Valitations/category.validation.js";
import { success } from "zod";

export const validateCreateCategory =(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const result = createCategorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success:true,
            errors:result.error?.flatten().fieldErrors
        });
    }
    req.body = result.data;
    next();
}


export const validateUpdateCategory = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const result = updateCategorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success:true,
            errors:result.error?.flatten().fieldErrors
        });
    }
    req.body = result.data;
    next();
}

