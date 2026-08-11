import { z } from "zod";

export const createCreatePOSchema = z.object({
    vendorName: z.string().min(1, "Vendor name is required"),
    orderDate: z.string().or(z.date()),
    expectedDeliveryDate: z.string().or(z.date()),
    paymentTerms: z.string().min(1, "Payment terms required"),
    notes: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    shipment: z.string().min(1, "Shipment method required"),
});

export const updateCreatePOSchema = createCreatePOSchema.partial();
