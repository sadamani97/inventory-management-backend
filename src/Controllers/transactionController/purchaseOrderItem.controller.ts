import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import purchaseOrderItemService from "../../Services/transctionService/purchaseOrderItem.service.js";

class PurchaseOrderItemController extends BaseController<any> {
    constructor() {
        super(purchaseOrderItemService, "purchase order item");
    }

    getByPurchaseOrderId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const items = await purchaseOrderItemService.findByPurchaseOrderId(Number(req.params.poId));
            res.status(200).json({ success: true, message: "purchase order items", data: items });
        } catch (error) {
            next(error);
        }
    };
}

export default new PurchaseOrderItemController();
