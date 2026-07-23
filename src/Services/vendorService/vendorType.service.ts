import { VendorType } from "../../models/vendor/vendorType.model.js";
import { Op } from "sequelize";

class VendorTypeService {
    async create(data: any) {
        const exists = await VendorType.findOne({
            where: {
                typeName: data.typeName,
            },
        })
        if (exists) {
            throw new Error("vendor type already exists")
        }
        return await VendorType.create(data)
    }
    async findAll() {
        return await VendorType.findAll()
    }
    async FindById(id: number) {
        const vendorType = await VendorType.findByPk(id)
        if (!vendorType) {
            throw new Error("vendor type not found")
        }
        return vendorType
    }
    async Update(id: number, data: any) {
        const vendorType = await VendorType.findByPk(id)
        if (!vendorType) {
            throw new Error("vendor type not found")
        }
        const exists = await VendorType.findOne({
            where: {
                typeName: data.typeName,
                vendorTypeId: { [Op.ne]: id }
            },
        })
        if (exists) {
            throw new Error("vendor type already exists")
        }
        await vendorType.update(data)
        return vendorType
    }
    async Delete(id: number) {
        const vendorType = await VendorType.findByPk(id)
        if (!vendorType) {
            throw new Error("vendor type not found")
        }
        return vendorType.destroy()
    }
}

export const vendorTypeService = new VendorTypeService();