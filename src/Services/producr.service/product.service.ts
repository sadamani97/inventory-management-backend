// import { Product } from "../models/product/product.model.js";
// import { Category } from "../models/product/categories.model.js";
import { Op } from "sequelize";
import { Product, Category, Brand, Unit } from "../../models/product/index.js";
import { alertService } from "../alertService/alert.service.js";


class ProductService {
    async create(data: any) {
        // Ensure Category exists or get/create default
        if (data.categoryId) {
            const cat = await Category.findByPk(data.categoryId);
            if (!cat) {
                const newCat = await Category.create({ categoryName: "General" });
                data.categoryId = newCat.categoryId;
            }
        } else {
            const [defCat] = await Category.findOrCreate({
                where: { categoryName: "General" },
                defaults: { categoryName: "General" },
            });
            data.categoryId = defCat.categoryId;
        }

        // Ensure Brand exists or get/create default by brandName or brandId
        if (data.brandName && typeof data.brandName === "string" && data.brandName.trim()) {
            const [br] = await Brand.findOrCreate({
                where: { brandName: data.brandName.trim() },
                defaults: { brandName: data.brandName.trim() },
            });
            data.brandId = br.brandId;
        } else if (data.brandId) {
            const br = await Brand.findByPk(data.brandId);
            if (!br) {
                const newBr = await Brand.create({ brandName: "Generic" });
                data.brandId = newBr.brandId;
            }
        } else {
            const [defBr] = await Brand.findOrCreate({
                where: { brandName: "Generic" },
                defaults: { brandName: "Generic" },
            });
            data.brandId = defBr.brandId;
        }

        // Ensure Unit exists or get/create default
        if (data.unitId) {
            const un = await Unit.findByPk(data.unitId);
            if (!un) {
                const newUn = await Unit.create({ unitName: "piece", quantity: 1 });
                data.unitId = newUn.unitId;
            }
        } else {
            const [defUn] = await Unit.findOrCreate({
                where: { unitName: "piece" },
                defaults: { unitName: "piece", quantity: 1 },
            });
            data.unitId = defUn.unitId;
        }

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
        if (data.brandName && typeof data.brandName === "string" && data.brandName.trim()) {
            const [br] = await Brand.findOrCreate({
                where: { brandName: data.brandName.trim() },
                defaults: { brandName: data.brandName.trim() },
            });
            data.brandId = br.brandId;
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




