import { Router } from "express";
import invoiceController from "../../Controllers/invoiceController/invoice.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { ensureInvoicePayload } from "../../middlewares/invoice.middleware.js";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from "../../Valitations/invoiceValidation/invoice.validation.js";

const router = Router();

router.get("/stats", invoiceController.getStats);
router.post("/", ensureInvoicePayload, validate(createInvoiceSchema), invoiceController.create);
router.get("/", invoiceController.findAll);
router.get("/:id", invoiceController.FindById);
router.put("/:id", ensureInvoicePayload, validate(updateInvoiceSchema), invoiceController.Update);
router.delete("/:id", invoiceController.Delete);

export default router;
