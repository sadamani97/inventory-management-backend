import { z } from "zod";

export const createAlertSchema = z.object({
    title: z.string().min(2, "Title is required").trim(),
    relatedItem: z.string().min(1, "Related item is required").trim(),
    referenceId: z.string().optional(),
    type: z.enum([
        'LOW_STOCK',
        'OUT_OF_STOCK',
        'ITEM_EXPIRING',
        'VENDOR_DELAY',
        'PAYMENT_REMINDER',
        'SHIPMENT_DELAY',
        'CANCELLED_PO'
    ]),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
    status: z.enum(['Active', 'Delayed', 'In Transit', 'Pending', 'Cancelled', 'Resolved']),
    description: z.string().optional(),
});

export const updateAlertSchema = z.object({
    title: z.string().optional(),
    relatedItem: z.string().optional(),
    referenceId: z.string().optional(),
    type: z.enum([
        'LOW_STOCK',
        'OUT_OF_STOCK',
        'ITEM_EXPIRING',
        'VENDOR_DELAY',
        'PAYMENT_REMINDER',
        'SHIPMENT_DELAY',
        'CANCELLED_PO'
    ]).optional(),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low']).optional(),
    status: z.enum(['Active', 'Delayed', 'In Transit', 'Pending', 'Cancelled', 'Resolved']).optional(),
    description: z.string().optional(),
});

export type CreateAlertInput = z.infer<typeof createAlertSchema>;
export type UpdateAlertInput = z.infer<typeof updateAlertSchema>;
