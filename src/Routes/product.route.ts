import { Router } from "express"

import productController from "../Controllers/productController/product.controller.js";
import { validateCreateProduct, validateUpdateProduct } from "../middlewares/product.middleware.js";

const router = Router();

router.post('/', validateCreateProduct, productController.create)
router.get('/', productController.findAll)
router.get('/:id', productController.FindById)
router.put('/:id', validateUpdateProduct, productController.Update)
router.delete('/:id', productController.Delete)


export default router

