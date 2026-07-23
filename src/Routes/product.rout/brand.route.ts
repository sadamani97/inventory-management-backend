import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createBrandSchema, updateBrandSchema } from "../../Valitations/productValidation/brand.validation.js";
import brandController from "../../Controllers/productController/brand.controller.js";

const router = Router()


router.post("/", validate(createBrandSchema), brandController.create);
router.get("/", brandController.findAll);   
router.get("/:id", brandController.FindById);
router.put("/:id", validate(updateBrandSchema), brandController.Update);
router.delete("/:id", brandController.Delete);

export const BrandRouter = router;