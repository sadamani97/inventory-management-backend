import z from "zod"

export const createBrandSchema = z.object({
    brandName: z.string().min(3).max(50),
    brandId:z.number()
})
// export const updateBrandSchema = createBrandSchema.partial()
export const updateBrandSchema = z.object({
    brandName: z.string().min(3).max(50).optional(),
    brandId:z.number().optional()
})



