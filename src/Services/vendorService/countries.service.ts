import { Country } from "../../models/vendor/countries.model.js";
import { Op } from "sequelize";

class CountriesService {
    async create(data: any) {
        const exists = await Country.findOne({ where: { countryName: data.countryName } });
        if (exists) throw new Error("Country already exists");
        return await Country.create(data);
    }
    async findAll() {
        return await Country.findAll();
    }
    async FindById(id: number) {
        const country = await Country.findByPk(id);
        if (!country) throw new Error("Country not found");
        return country;
    }
    async Update(id: number, data: any) {
        const country = await Country.findByPk(id);
        if (!country) throw new Error("Country not found");
        const exists = await Country.findOne({
            where: { countryName: data.countryName, countryId: { [Op.ne]: id } },
        });
        if (exists) throw new Error("Country already exists");
        await country.update(data);
        return country;
    }
    async Delete(id: number) {
        const country = await Country.findByPk(id);
        if (!country) throw new Error("Country not found");
        return country.destroy();
    }
}

export const countriesService = new CountriesService();
