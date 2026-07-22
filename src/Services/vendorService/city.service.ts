import { City } from "../../models/vendor/cities.model.js";
import { State } from "../../models/vendor/states.model.js";
import { Op } from "sequelize";

class CityService {
    async create(data: any) {
        const exists = await City.findOne({ where: { cityName: data.cityName, stateId: data.stateId } });
        if (exists) throw new Error("City already exists");
        return await City.create(data);
    }
    async findAll() {
        return await City.findAll({ include: [{ model: State, as: "state" }] });
    }
    async FindById(id: number) {
        const city = await City.findByPk(id, { include: [{ model: State, as: "state" }] });
        if (!city) throw new Error("City not found");
        return city;
    }
    async Update(id: number, data: any) {
        const city = await City.findByPk(id);
        if (!city) throw new Error("City not found");
        const exists = await City.findOne({
            where: { cityName: data.cityName, stateId: data.stateId, cityId: { [Op.ne]: id } },
        });
        if (exists) throw new Error("City already exists");
        await city.update(data);
        return city;
    }
    async Delete(id: number) {
        const city = await City.findByPk(id);
        if (!city) throw new Error("City not found");
        return city.destroy();
    }
}

export const cityService = new CityService();
