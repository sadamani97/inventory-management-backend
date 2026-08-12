import { Router } from "express";
import purchaseOrderController from "../../Controllers/transactionController/purchaseOrder.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    createPurchaseOrderSchema,
    updatePurchaseOrderSchema,
} from "../../Valitations/transactionValidation/purchaseOrder.validation.js";

const router = Router();

router.get("/stats", purchaseOrderController.getStats);
router.post("/", validate(createPurchaseOrderSchema), purchaseOrderController.create);
router.get("/", purchaseOrderController.findAll);
router.get("/:id", purchaseOrderController.FindById);
router.put("/:id", validate(updatePurchaseOrderSchema), purchaseOrderController.Update);
router.delete("/:id", purchaseOrderController.Delete);

export default router;
