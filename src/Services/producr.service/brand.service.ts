import { Brand } from "../../models/product/brand.model.js"
import { Op } from "sequelize"
class BrandService {
    async create(data: any) {
        const exists = await Brand.findOne({
            where: {
                brandName: data.brandName,
            },
        })
        if (exists) {
            throw new Error("brand already exists")
        }
        return await Brand.create(data)
    }
    async findAll() {
        return await Brand.findAll()
    }
    async FindById(id: number) {
        const brand = await Brand.findByPk(id)
        if (!brand) {
            throw new Error("brand not found")
        }
        return brand
    }
    async Update(id: number, data: any) {
        const brand = await Brand.findByPk(id)
        if (!brand) {
            throw new Error("brand not found")
        }
        const exists = await Brand.findOne({
            where: {
                brandName: data.brandName,
                brandId: { [Op.ne]: id }
            },
        })
        if (exists) {
            throw new Error("Brand already exists")
        }
        await brand.update(data)
        return brand
    }
    async Delete(id: number) {
        const brand = await Brand.findByPk(id)
        if (!brand) {
            throw new Error("brand not found")
        }
        return brand.destroy()
    }
}

export const brandService = new BrandService();