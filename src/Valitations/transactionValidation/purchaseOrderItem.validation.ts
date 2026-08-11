import { z } from "zod";

export const createPurchaseOrderItemSchema = z.object({
    purchaseOrderId: z.number(),
    productId: z.number(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.number().min(0, "Unit price must be non-negative"),
    totalPrice: z.number().min(0, "Total price must be non-negative").optional(),
    receivedQuantity: z.number().min(0).optional(),
});

export const updatePurchaseOrderItemSchema = createPurchaseOrderItemSchema.partial();

