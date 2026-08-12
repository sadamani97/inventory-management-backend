import { Router } from "express";
import purchaseOrderItemController from "../../Controllers/transactionController/purchaseOrderItem.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    createPurchaseOrderItemSchema,
    updatePurchaseOrderItemSchema,
} from "../../Valitations/transactionValidation/purchaseOrderItem.validation.js";

const router = Router();

router.post("/", validate(createPurchaseOrderItemSchema), purchaseOrderItemController.create);
router.get("/", purchaseOrderItemController.findAll);
router.get("/po/:poId", purchaseOrderItemController.getByPurchaseOrderId);
router.get("/:id", purchaseOrderItemController.FindById);
router.put("/:id", validate(updatePurchaseOrderItemSchema), purchaseOrderItemController.Update);
router.delete("/:id", purchaseOrderItemController.Delete);

export default router;
