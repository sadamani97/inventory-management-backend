import { Product } from "../models/product.model.js";


class ProductService {
    async create(data:any){
    return await Product.create(data)
    }
    async findAll() {
        return await Product.findAll()
    }
    async FindById(id:number){
        const product = await Product.findByPk(id)
        if(!product) {
            throw new Error("Product Not Found");
        }
        return product
    }
    async Update(id:number,data:any){
        const product = await Product.findByPk(id)
        if (!product){
            throw new Error("Product not found")
        }
        await product.update(data)
        return product
    }
    async Delete (id:number){
    const product = await Product.findByPk(id)
    if(!product){
        throw new Error("product not found")
    }
    return product.destroy()
}
    }

    export default new ProductService();
    



