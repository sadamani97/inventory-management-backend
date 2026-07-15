import {z} from "zod";

export const createProductSchema= z.object({
    id: z.number(),
    productName:z.string().min(3),
    sku:z.string(),
    barcode:z.string(),
    category:z.string(),
    brand:z.string(),
    purchaseRate:z.number(),
    sellingPrice:z.number(),
    quantity:z.number(),
    lowStockLimit:z.number(),
    unit:z.string(),
    status:z.enum(["Active","Inactive"]),
    description:z.string(),
    addVarient:z.string()
})



