import{Router} from "express"

import {createProduct,getProducts,getProduct,updateProduct,deleteProduct} from "../Controllers/product.controller.js";
import {validateCreateProduct,validateUpdateProduct} from "../middlewares/product.middleware.js";

const router = Router();

router.post('/',validateCreateProduct,createProduct)
router.get('/',getProducts)
router.get('/:id',getProduct)
router.put('/:id',validateUpdateProduct,updateProduct)
router.delete('/:id',deleteProduct)

export default router

