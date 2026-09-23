import type { Request, Response, NextFunction } from "express";

export const ensureInvoicePayload = (req: Request, res: Response, next: NextFunction) => {
  const payload = req?.body ?? {};

  // POST requires invoiceNumber and items
  if (req.method === "POST") {
    if (!payload?.invoiceNumber) {
      return res.status(400).json({ success: false, message: "Invoice number is required" });
    }

    if (!Array.isArray(payload?.items) || payload.items.length === 0) {
      return res.status(400).json({ success: false, message: "Invoice items must be a non-empty array" });
    }
  }

  // If items array is provided (on POST or PUT), ensure no duplicate product IDs
  if (Array.isArray(payload?.items) && payload.items.length > 0) {
    const hasDuplicateProductIds = payload.items.some((item: any, idx: number) => {
      const productId = item?.productId;
      if (!productId) return false;
      return payload.items.findIndex((entry: any) => entry?.productId === productId) !== idx;
    });

    if (hasDuplicateProductIds) {
      return res.status(400).json({ success: false, message: "Duplicate products are not allowed in an invoice" });
    }
  }

  next();
};
