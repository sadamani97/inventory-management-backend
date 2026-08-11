import { z } from "zod";

export const createPurchaseOrderActivitySchema = z.object({
    purchaseOrderId: z.number(),
    activityType: z.enum([
        "PO Created",
        "Delivery Received",
        "PO Cancelled",
        "Vendor Updated",
        "Stock Updated",
    ]),
    description: z.string().min(1, "Description is required"),
    userId: z.number().optional(),
});

export const updatePurchaseOrderActivitySchema = createPurchaseOrderActivitySchema.partial();

