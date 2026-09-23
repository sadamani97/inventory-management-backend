import { Router } from "express";
import categoryController from "../../Controllers/productController/category.controller.js";
// import { validateCreateCategory, validateUpdateCategory } from "../../middlewares/categort.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../../Valitations/productValidation/category.validation.js";
const router = Router();

router.post("/", validate(createCategorySchema), categoryController.create);
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.FindById);
router.put("/:id", validate(updateCategorySchema), categoryController.Update);
router.delete("/:id", categoryController.Delete);

export const CategoryRouter = router;   