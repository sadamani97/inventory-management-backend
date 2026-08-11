import { Router } from "express";
import purchaseOrderActivityController from "../../Controllers/transactionController/purchaseOrderActivity.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    createPurchaseOrderActivitySchema,
    updatePurchaseOrderActivitySchema,
} from "../../Valitations/transactionValidation/purchaseOrderActivity.validation.js";

const router = Router();

router.post("/", validate(createPurchaseOrderActivitySchema), purchaseOrderActivityController.create);
router.get("/", purchaseOrderActivityController.findAll);
router.get("/po/:poId", purchaseOrderActivityController.getByPurchaseOrderId);
router.get("/:id", purchaseOrderActivityController.FindById);
router.put("/:id", validate(updatePurchaseOrderActivitySchema), purchaseOrderActivityController.Update);
router.delete("/:id", purchaseOrderActivityController.Delete);

export default router;
