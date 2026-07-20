import { Unit } from "../models/product/unit.model.js"
import { Op } from "sequelize"
class UnitService {
    async create(data: any) {
        const exists = await Unit.findOne({
            where: {
                unitName: data.unitName,
            },
        })
        if (exists) {
            throw new Error("unit already exists")
        }
        return await Unit.create(data)
    }
    async findAll() {
        return await Unit.findAll()
    }
    async FindById(id: number) {
        const unit = await Unit.findByPk(id)
        if (!unit) {
            throw new Error("unit not found")
        }
        return unit
    }
    async Update(id: number, data: any) {
        const unit = await Unit.findByPk(id)
        if (!unit) {
            throw new Error("unit not found")
        }
        const exists = await Unit.findOne({
            where: {
                unitName: data.unitName,
            
                unitId: { [Op.ne]: id }
            },
        })
        if (exists) {
            throw new Error("unit already exists")
        }
        await unit.update(data)
        return unit
    }
    async Delete(id: number) {
        const unit = await Unit.findByPk(id)
        if (!unit) {
            throw new Error("unit not found")
        }
        return unit.destroy()
    }
}

export const unitService = new UnitService();