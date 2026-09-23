import type { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../Valitations/productValidation/product.validation.js"
import { updateProductSchema } from "../Valitations/productValidation/product.validation.js"


export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }
    next()
}
export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }
    next()
}