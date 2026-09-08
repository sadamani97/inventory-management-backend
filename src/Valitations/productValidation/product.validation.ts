import {z} from "zod";

export const createProductSchema = z.object({
    productName: z.string().min(3),
    sku: z.string().min(1),
    barcode: z.string().optional().default(""),
    categoryId: z.coerce.number().int().positive(),
    brandId: z.coerce.number().int().positive().optional().default(1),
    brandName: z.string().optional(),
    purchaseRate: z.coerce.number().nonnegative(),
    sellingPrice: z.coerce.number().nonnegative(),
    quantity: z.coerce.number().nonnegative(),
    lowStockLimit: z.coerce.number().nonnegative().optional().default(10),
    unitId: z.coerce.number().int().positive(),
    status: z.enum(["Active", "Inactive", "Archived", "Draft", "Out of Stock"]).default("Active"),
    description: z.string().optional().default(""),
    imageUrl: z.string().optional().default(""),
    addVarient: z.string().optional().default("")
});
export const updateProductSchema= createProductSchema.partial()



