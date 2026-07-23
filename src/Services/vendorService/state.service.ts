import { State } from "../../models/vendor/states.model.js";
import { Country } from "../../models/vendor/countries.model.js";
import { Op } from "sequelize";

class StateService {
    async create(data: any) {
        const exists = await State.findOne({ where: { stateName: data.stateName, countryId: data.countryId } });
        if (exists) throw new Error("State already exists");
        return await State.create(data);
    }
    async findAll() {
        return await State.findAll({ include: [{ model: Country, as: "country" }] });
    }
    async FindById(id: number) {
        const state = await State.findByPk(id, { include: [{ model: Country, as: "country" }] });
        if (!state) throw new Error("State not found");
        return state;
    }
    async Update(id: number, data: any) {
        const state = await State.findByPk(id);
        if (!state) throw new Error("State not found");
        const exists = await State.findOne({
            where: { stateName: data.stateName, countryId: data.countryId, stateId: { [Op.ne]: id } },
        });
        if (exists) throw new Error("State already exists");
        await state.update(data);
        return state;
    }
    async Delete(id: number) {
        const state = await State.findByPk(id);
        if (!state) throw new Error("State not found");
        return state.destroy();
    }
}

export const stateService = new StateService();

