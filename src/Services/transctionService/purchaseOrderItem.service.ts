import { BaseService } from "../baseService.js";
import { PurchaseOrderItem } from "../../models/transctionModel/index.js";
import { Product } from "../../models/product/product.model.js";

class PurchaseOrderItemService extends BaseService<any> {
    constructor() {
        super(PurchaseOrderItem, "id", undefined, "Purchase Order Item");
    }

    async findByPurchaseOrderId(purchaseOrderId: number) {
        return await PurchaseOrderItem.findAll({
            where: { purchaseOrderId },
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "productName", "sku", "barcode"],
                },
            ],
        });
    }
}


export default new PurchaseOrderItemService();
