import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import purchaseOrderService from "../../Services/transctionService/purchaseOrder.service.js";

class PurchaseOrderController extends BaseController<any> {
    constructor() {
        super(purchaseOrderService, "purchase order");
    }

    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await purchaseOrderService.getPOStats();
            res.status(200).json({ success: true, message: "purchase order stats", data: stats });
        } catch (error) {
            next(error);
        }
    };
}

export default new PurchaseOrderController();
