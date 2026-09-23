import { BaseService } from "../baseService.js";
import { PurchaseOrderActivity } from "../../models/transctionModel/index.js";

class PurchaseOrderActivityService extends BaseService<any> {
    constructor() {
        super(PurchaseOrderActivity, "id", undefined, "Purchase Order Activity");
    }

    async findByPurchaseOrderId(purchaseOrderId: number) {
        return await PurchaseOrderActivity.findAll({
            where: { purchaseOrderId },
            order: [["createdAt", "DESC"]],
        });
    }
}

export default new PurchaseOrderActivityService();
