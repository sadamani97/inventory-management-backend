import { Router } from "express";
import salesOrderController from "../../Controllers/transactionController/salesOrder.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { ensureSalesOrderPayload } from "../../middlewares/salesOrder.middleware.js";
import {
  createSalesOrderSchema,
  updateSalesOrderSchema,
} from "../../Valitations/transactionValidation/salesOrder.validation.js";

const router = Router();

router.get("/stats", salesOrderController.getStats);
router.post("/", ensureSalesOrderPayload, validate(createSalesOrderSchema), salesOrderController.create);
router.get("/", salesOrderController.findAll);
router.get("/:id", salesOrderController.FindById);
router.put("/:id", ensureSalesOrderPayload, validate(updateSalesOrderSchema), salesOrderController.Update);
router.delete("/:id", salesOrderController.Delete);

export default router;
