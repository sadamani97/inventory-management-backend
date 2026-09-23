import { Router } from "express"

import productController from "../../Controllers/productController/product.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../../Valitations/productValidation/product.validation.js";   

const router = Router();

router.get('/stats', productController.getStats)
router.post('/upload', (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: image,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || "Failed to upload image" });
  }
});
router.post('/', validate(createProductSchema), productController.create)
router.get('/', productController.findAll)
router.get('/:id', productController.FindById)
router.put('/:id', validate(updateProductSchema), productController.Update)
router.delete('/:id', productController.Delete)


export default router

