import { Address } from "../../models/vendor/address.model.js";
import { City, State, Country } from "../../models/vendor/index.js";
import { Op } from "sequelize";
import { sequelize } from "../../config/db.js";

class AddressService {
    private async resolveLocation(data: any) {
        const payload = { ...data };
        let countryId = Number(payload.countryId);
        let stateId = Number(payload.stateId);
        let cityId = Number(payload.cityId);

        // 1. Resolve Country
        let country = !isNaN(countryId) && countryId > 0 ? await Country.findByPk(countryId) : null;
        if (!country && payload.countryName?.trim()) {
            const cName = payload.countryName.trim();
            country = await Country.findOne({
                where: sequelize.where(sequelize.fn("LOWER", sequelize.col("countryName")), cName.toLowerCase())
            });
            if (!country) {
                country = await Country.create({
                    countryName: cName,
                    countryCode: cName.substring(0, 3).toUpperCase(),
                });
            }
        }
        if (!country) {
            country = await Country.findByPk(1) || await Country.findOne();
            if (!country) {
                country = await Country.create({ countryName: "India", countryCode: "IND" });
            }
        }
        countryId = country.countryId;

        // 2. Resolve State
        let state = !isNaN(stateId) && stateId > 0 ? await State.findByPk(stateId) : null;
        if (!state && payload.stateName?.trim()) {
            const sName = payload.stateName.trim();
            state = await State.findOne({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn("LOWER", sequelize.col("stateName")), sName.toLowerCase()),
                        { countryId }
                    ]
                }
            });
            if (!state) {
                state = await State.create({
                    stateName: sName,
                    countryId,
                });
            }
        }
        if (!state) {
            state = await State.findOne({ where: { countryId } }) || await State.findByPk(1) || await State.findOne();
            if (!state) {
                state = await State.create({ stateName: "General", countryId });
            }
        }
        stateId = state.stateId;

        // 3. Resolve City
        let city = !isNaN(cityId) && cityId > 0 ? await City.findByPk(cityId) : null;
        if (!city && payload.cityName?.trim()) {
            const ctName = payload.cityName.trim();
            city = await City.findOne({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn("LOWER", sequelize.col("cityName")), ctName.toLowerCase()),
                        { stateId }
                    ]
                }
            });
            if (!city) {
                city = await City.create({
                    cityName: ctName,
                    stateId,
                });
            }
        }
        if (!city) {
            city = await City.findOne({ where: { stateId } }) || await City.findByPk(1) || await City.findOne();
            if (!city) {
                city = await City.create({ cityName: "General", stateId });
            }
        }
        cityId = city.cityId;

        payload.countryId = countryId;
        payload.stateId = stateId;
        payload.cityId = cityId;

        // Ensure required fields have valid defaults
        if (!payload.addressLine || !payload.addressLine.trim()) {
            payload.addressLine = "General Address";
        }
        if (!payload.pincode || !payload.pincode.trim()) {
            payload.pincode = "000000";
        }

        return payload;
    }

    async create(data: any) {
        const resolvedData = await this.resolveLocation(data);
        return await Address.create(resolvedData);
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
        const resolvedData = await this.resolveLocation({ ...address.toJSON(), ...data });
        await address.update(resolvedData);
        return address;
    }
    async Delete(id: number) {
        const address = await Address.findByPk(id);
        if (!address) throw new Error("Address not found");
        return address.destroy();
    }
}

export const addressService = new AddressService();
