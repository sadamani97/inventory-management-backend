import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createUnitSchema, updateUnitSchema } from "../../Valitations/productValidation/unit.validation.js";
import unitController from "../../Controllers/productController/unit.controller.js";

const router = Router();

router.post("/", validate(createUnitSchema), unitController.create);
router.get("/", unitController.findAll);
router.get("/:id", unitController.FindById);
router.put("/:id", validate(updateUnitSchema), unitController.Update);
router.delete("/:id", unitController.Delete);
export const UnitRouter = router;