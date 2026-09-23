import { Router } from "express";
import vendorBankDetailsController from "../../Controllers/vendorControllers/vendorBankDetails.controller.js";

const router = Router();

router.post("/", vendorBankDetailsController.create);
router.get("/", vendorBankDetailsController.findAll);
router.get("/:id", vendorBankDetailsController.FindById);
router.put("/:id", vendorBankDetailsController.Update);
router.delete("/:id", vendorBankDetailsController.Delete);

export default router;
