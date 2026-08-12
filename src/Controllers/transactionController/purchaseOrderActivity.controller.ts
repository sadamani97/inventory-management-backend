import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import purchaseOrderActivityService from "../../Services/transctionService/purchaseOrderActivity.service.js";

class PurchaseOrderActivityController extends BaseController<any> {
    constructor() {
        super(purchaseOrderActivityService, "purchase order activity");
    }

    getByPurchaseOrderId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const activities = await purchaseOrderActivityService.findByPurchaseOrderId(Number(req.params.poId));
            res.status(200).json({ success: true, message: "purchase order activities", data: activities });
        } catch (error) {
            next(error);
        }
    };
}

export default new PurchaseOrderActivityController();
