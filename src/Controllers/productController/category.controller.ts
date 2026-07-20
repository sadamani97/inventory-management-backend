import { BaseController } from "../baseController.js";
import { categoryService } from "../../Services/category.service.js";


export default new BaseController(categoryService, "category")





























// export const createCategory= async(req:Request, res:Response) =>{
//     const category = await categoryService.create(req.body)
//     res.status(201).json({success:true,message:"category created", data:category})
// }
// export const getCategory = async(req:Request, res:Response)=>{
//     const category = await categoryService.findAll()
//     res.status(200).json({success:true,message:"categories", data:category})

// }

// export const getCategoryById = async(req:Request, res:Response)=>{
//     const category = await categoryService.FindById(Number(req.params.id))
//     res.status(200).json({success:true,message:"category", data:category})

// }

// export const UpdateCategory = async(req:Request, res:Response)=>{
//     const category = await categoryService.Update(Number(req.params.id),req.body)
//     res.status(200).json({success:true,message:"category updated", data:category})

// }

// export const DeleteCategory = async(req:Request, res:Response)=>{
//     const category = await categoryService.Delete(Number(req.params.id))
//     res.status(200).json({success:true,message:"category deleted", data:category})

// }