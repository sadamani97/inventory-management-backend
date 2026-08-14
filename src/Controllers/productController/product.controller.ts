import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../baseController.js";
import productService from "../../Services/producr.service/product.service.js";

class ProductController extends BaseController<any> {
  constructor() {
    super(productService, "product");
  }

  getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await productService.getProductStats();
      res.status(200).json({
        success: true,
        message: "Product statistics fetched successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();




































// export const createProduct= async(req:Request, res:Response) =>{
//     const product = await productService.create(req.body)
//     res.status(201).json({success:true,message:"product created", data:product})
// }
// export const getProducts = async (req:Request, res:Response) => {
//     const products = await productService.findAll()
//     res.status(200).json({success:true,message:"products", data:products})
// }
// export const getProduct = async(req:Request, res:Response) => {
//     console.log(req.params.id)
//     const product = await productService.FindById(Number(req.params.id))
//     res.status(200).json({success:true,message:"products", data:product})

// }
// export const updateProduct = async(req:Request, res:Response) => {
//     const product = await productService.Update(Number(req.params.id), req.body)
//     res.status(200).json({success:true,message:"product updated", data:product})
// }

// export const deleteProduct = async(req:Request, res:Response) => {
//     const product = await productService.Delete(Number(req.params.id))
//     res.status(200).json({success:true, messaage:"product deleted", data:product})
// }