import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createVendorTypeSchema } from "../../Valitations/vendorValidation/vendor.validation.js";
import vendorTypeController from "../../Controllers/vendorControllers/vendorType.controller.js";

const router = Router();

router.post("/", validate(createVendorTypeSchema), vendorTypeController.create);
router.get("/", vendorTypeController.findAll);
router.get("/:id", vendorTypeController.FindById);
router.put("/:id", vendorTypeController.Update);
router.delete("/:id", vendorTypeController.Delete);

export default router;
