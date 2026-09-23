import { Address } from "../../models/vendor/address.model.js";
import { City, State,Country } from "../../models/vendor/index.js";

class AddressService {
    async create(data: any) {
        return await Address.create(data);
    }
    async findAll() {
        return await Address.findAll({
            include: [
                { model: City, as: "city" },
                { model: State, as: "state" },
                { model: Country, as: "country" }
            ]
        });
    }
    async FindById(id: number) {
        const address = await Address.findByPk(id, {
            include: [
                { model: City, as: "city" },
                { model: State, as: "state" },
                { model: Country, as: "country" }
            ]
        });
        if (!address) throw new Error("Address not found");
        return address;
    }
    async Update(id: number, data: any) {
        const address = await Address.findByPk(id);
        if (!address) throw new Error("Address not found");
        await address.update(data);
        return address;
    }
    async Delete(id: number) {
        const address = await Address.findByPk(id);
        if (!address) throw new Error("Address not found");
        return address.destroy();
    }
}

export const addressService = new AddressService();
