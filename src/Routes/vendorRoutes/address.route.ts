import { Router } from "express";
import addressController from "../../Controllers/vendorControllers/address.controller.js";

const router = Router();

router.post("/", addressController.create);
router.get("/", addressController.findAll);
router.get("/:id", addressController.FindById);
router.put("/:id", addressController.Update);
router.delete("/:id", addressController.Delete);

export default router;
