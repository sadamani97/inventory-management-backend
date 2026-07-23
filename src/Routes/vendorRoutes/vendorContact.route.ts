import { Router } from "express";
import vendorContactController from "../../Controllers/vendorControllers/vendorContact.controller.js";

const router = Router();

router.post("/", vendorContactController.create);
router.get("/", vendorContactController.findAll);
router.get("/:id", vendorContactController.FindById);
router.put("/:id", vendorContactController.Update);
router.delete("/:id", vendorContactController.Delete);

export default router;
