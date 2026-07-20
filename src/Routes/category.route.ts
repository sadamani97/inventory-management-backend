import { Router } from "express";
import categoryController from "../Controllers/productController/category.controller.js";
import { validateCreateCategory, validateUpdateCategory } from "../middlewares/categort.middleware.js";

const router = Router();

router.post("/", validateCreateCategory, categoryController.create);
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.FindById);
router.put("/:id", validateUpdateCategory, categoryController.Update);
router.delete("/:id", categoryController.Delete);

export const CategoryRouter = router;