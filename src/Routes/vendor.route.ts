import { Router } from "express";
import vendorController from "../Controllers/vendor.controller.js";

const router = Router();

router.post('/', vendorController.create)
router.get('/', vendorController.findAll)
router.get('/:id', vendorController.FindById)
router.put('/:id', vendorController.Update)
router.delete('/:id', vendorController.Delete)

export default router