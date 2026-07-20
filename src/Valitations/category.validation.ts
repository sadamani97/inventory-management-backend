import {z} from "zod";


export const createCategorySchema = z.object({
    categoryName:z.string().min(3).max(100)
})

export const updateCategorySchema=createCategorySchema.partial()
