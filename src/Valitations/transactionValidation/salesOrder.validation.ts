import { z } from "zod";

export const salesOrderItemSchema = z.object({
  productId: z.number().int().positive(),
  productName: z.string().optional(),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0),
});

export const createSalesOrderSchema = z.object({
  orderNumber: z.string().min(1, "Sales order number is required"),
  customerType: z.enum([
    "Walk In Customer",
    "Retail Customer",
    "Wholesale Customer",
    "Online Customer",
  ]),
  customerName: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["Draft", "Paid", "Pending", "Cancelled", "Completed"]).optional(),
  paymentMode: z.enum(["Cash", "UPI", "Card"]).optional(),
  subtotal: z.number().optional(),
  discountAmount: z.number().optional(),
  totalAmount: z.number().optional(),
  orderDate: z.string().or(z.date()).optional(),
  items: z.array(salesOrderItemSchema).optional(),
});

export const updateSalesOrderSchema = createSalesOrderSchema.partial();
