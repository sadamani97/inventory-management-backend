import type { Request, Response, NextFunction } from "express";

export const ensureSalesOrderPayload = (req: Request, res: Response, next: NextFunction) => {
  const payload = req?.body ?? {};

  if (!payload?.orderNumber) {
    return res.status(400).json({ success: false, message: "Sales order number is required" });
  }

  if (!payload?.customerType) {
    return res.status(400).json({ success: false, message: "Customer type is required" });
  }

  if (!Array.isArray(payload?.items)) {
    return res.status(400).json({ success: false, message: "Sales order items must be an array" });
  }

  const hasDuplicateProductIds = payload.items.some((item: any, idx: number) => {
    const productId = item?.productId;
    return payload.items.findIndex((entry: any) => entry?.productId === productId) !== idx;
  });

  if (hasDuplicateProductIds) {
    return res.status(400).json({ success: false, message: "Duplicate products are not allowed in a sales order" });
  }

  next();
};
