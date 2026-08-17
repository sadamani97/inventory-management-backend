// import { Product } from "../models/product/product.model.js";
// import { Category } from "../models/product/categories.model.js";
import { Op } from "sequelize";
import { Product, Category } from "../../models/product/index.js";
import { alertService } from "../alertService/alert.service.js";


class ProductService {
    async create(data: any) {
        const product = await Product.create(data);
        if (product) {
            await alertService.checkAndSyncProductAlerts(product);
        }
        return product;
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
        await product.update(data);
        await alertService.checkAndSyncProductAlerts(product);
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

    async getProductStats() {
        const totalCount = await Product.count();

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const addedThisMonthCount = await Product.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                },
            },
        });

        const activeStockCount = await Product.count({
            where: {
                quantity: {
                    [Op.gt]: 10,
                },
            },
        });

        const lowStockCount = await Product.count({
            where: {
                quantity: {
                    [Op.gt]: 0,
                    [Op.lte]: 10,
                },
            },
        });

        const outOfStockCount = await Product.count({
            where: {
                quantity: {
                    [Op.lte]: 0,
                },
            },
        });

        const restockedSum: any = await Product.sum("quantity", {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                },
            },
        });
        const unitsRestockedThisMonth = Number(restockedSum ?? 0);

        return {
            totalProducts: totalCount,
            addedThisMonth: addedThisMonthCount,
            activeStock: activeStockCount,
            lowStock: lowStockCount,
            outOfStock: outOfStockCount,
            unitsRestockedThisMonth: unitsRestockedThisMonth,
        };
    }
}

export default new ProductService();




