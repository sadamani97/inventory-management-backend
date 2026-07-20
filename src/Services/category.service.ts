import {Category} from "../models/categories.model.js"

class CategoryService {
    async create(data:any){
        const exists =await Category.findOne({
            where:{
                categoryName:data.categoryName,
            },            
        })
        if (exists) {
            throw new Error ("category already exists")
        }
        return await Category.create(data)
    }
    async findAll(){
        return await Category.findAll()
    }
    async FindById(id:number){
        const category = await Category.findByPk(id)
        if(!category){
            throw new Error("Category not found")
        }
        return category
    }
    async Update(id:number,data:any){
        const category = await Category.findByPk(id)
        if(!category){
            throw new Error("Category not found")
        }
        const exists = await Category.findOne({
            where:{
                categoryName:data.categoryName,
            },
        })
        if (exists) {
            throw new Error("Category already exists")
        }
        await category.update(data)
        return category
    }
    async Delete(id:number){
        const category = await Category.findByPk(id)
        if(!category){
            throw new Error("Category not found")
        }
        return category.destroy()

        return true;
    }
}

export const categoryService = new CategoryService();