import { Router } from "express"

import productController from "../../Controllers/productController/product.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../../Valitations/productValidation/product.validation.js";   

const router = Router();

router.post('/', validate(createProductSchema), productController.create)
router.get('/', productController.findAll)
router.get('/:id', productController.FindById)
router.put('/:id', validate(updateProductSchema), productController.Update)
router.delete('/:id', productController.Delete)


export default router

