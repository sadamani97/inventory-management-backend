import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import salesOrderService from "../../Services/transctionService/salesOrder.service.js";

class SalesOrderController extends BaseController<any> {
  constructor() {
    super(salesOrderService, "sales order");
  }

  getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await salesOrderService.getSalesOrderStats();
      res.status(200).json({ success: true, message: "sales order stats", data: stats });
    } catch (error) {
      next(error);
    }
  };
}

export default new SalesOrderController();
