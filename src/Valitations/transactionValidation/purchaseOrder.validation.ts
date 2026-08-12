import { z } from "zod";

export const purchaseOrderItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.number().min(0, "Unit price must be non-negative"),
});

export const createPurchaseOrderSchema = z.object({
    poNumber: z.string().min(1, "PO number is required"),
    vendorId: z.number(),
    deliveryAddressId: z.number(),
    orderDate: z.string().or(z.date()),
    expectedDeliveryDate: z.string().or(z.date()),
    paymentTerms: z.string().min(1, "Payment terms required"),
    shipmentMethod: z.string().min(1, "Shipment method required"),
    notes: z.string().optional(),
    invoiceNumber: z.string().optional(),
    status: z.enum(["Draft", "Pending", "Approved", "Shipped", "Delivered", "Cancelled", "Delayed"]).optional(),
    paymentStatus: z.enum(["NIL", "Pending", "Paid", "Partially Paid"]).optional(),
    subtotal: z.number().optional(),
    taxPercentage: z.number().optional(),
    taxAmount: z.number().optional(),
    discountAmount: z.number().optional(),
    totalAmount: z.number().optional(),
    items: z.array(purchaseOrderItemSchema).optional(),
});

export const updatePurchaseOrderSchema = createPurchaseOrderSchema.partial();
