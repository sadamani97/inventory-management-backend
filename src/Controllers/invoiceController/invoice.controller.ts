import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import invoiceService from "../../Services/invoiceService/invoice.service.js";

class InvoiceController extends BaseController<any> {
  constructor() {
    super(invoiceService, "invoice");
  }

  getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await invoiceService.getInvoiceStats();
      res.status(200).json({
        success: true,
        message: "Invoice statistics fetched successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new InvoiceController();
