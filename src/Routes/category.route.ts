import { Router } from "express";
import {createCategory, getCategory,getCategoryById,UpdateCategory,DeleteCategory} from "../Controllers/category.controller.js";
import { validateCreateCategory, validateUpdateCategory } from "../middlewares/categort.middleware.js";

const router = Router();

router.post("/",validateCreateCategory,createCategory);
router.get("/",getCategory);
router.get("/:id",getCategoryById);
router.put("/:id",validateUpdateCategory,UpdateCategory);
router.delete("/:id",DeleteCategory);

export const CategoryRouter = router;