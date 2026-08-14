import { z } from "zod";

const numberOrCoercible = z.union([
  z.number(),
  z.string().transform((val) => {
    const parsed = Number(val);
    return isNaN(parsed) ? val : parsed;
  }),
]);

export const invoiceItemSchema = z.object({
  productId: numberOrCoercible.optional().nullable(),
  productName: z.string().optional().nullable(),
  quantity: numberOrCoercible.optional().default(1),
  unitPrice: numberOrCoercible.optional().default(0),
});

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  salesOrderId: numberOrCoercible.optional().nullable(),
  salesOrderNumber: z.string().optional().nullable(),
  customerName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  status: z.enum(["Draft", "Paid", "Pending", "Cancelled"]).optional(),
  paymentMethod: z.enum(["Cash", "UPI", "Card", "Net Banking", "Credit"]).optional(),
  subtotal: numberOrCoercible.optional(),
  discountAmount: numberOrCoercible.optional(),
  totalAmount: numberOrCoercible.optional(),
  invoiceDate: z.union([z.string(), z.date()]).optional(),
  items: z.array(invoiceItemSchema).optional(),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();

