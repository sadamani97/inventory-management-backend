// import { Product } from "../models/product/product.model.js";
// import { Category } from "../models/product/categories.model.js";
import { Product, Category } from "../../models/product/index.js";


class ProductService {
    async create(data: any) {
        return await Product.create(data)
    }


    async findAll() {
        return await Product.findAll({
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["categoryId", "categoryName"],
                },
            ],
        })
    }
    async FindById(id: number) {
        console.log("seacrching product id")
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["categoryId", "categoryName"],
                },
            ],
        })
        if (!product) {
           const error: any = new Error("product not found")
        error.status=404
        throw error
        }
        return product
    }
    async Update(id: number, data: any) {
        const product = await Product.findByPk(id)
        if (!product) {
            const error :any= new Error("product not found")
            error.status=404
            throw error
        }
        await product.update(data)
        return product
    }
    async Delete(id: number) {
        const product = await Product.findByPk(id)
        if (!product) {
            const error :any= new Error("product not found");
            error.status=404;
            throw error;
        }
        return product.destroy()
    }
}

export default new ProductService();




