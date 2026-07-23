import {z} from "zod";

export const createProductSchema= z.object({
    productName:z.string().min(3),
    sku:z.string(),
    barcode:z.string(),
    categoryId:z.number(),
    brandId:z.number(),
    purchaseRate:z.number(),
    sellingPrice:z.number(),
    quantity:z.number(),
    lowStockLimit:z.number(),
    unitId:z.number(),
    status:z.enum(["Active","Inactive"]),
    description:z.string(),
    addVarient:z.string().optional()
})
export const updateProductSchema= createProductSchema.partial()



