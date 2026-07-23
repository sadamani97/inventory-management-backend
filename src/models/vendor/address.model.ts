import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import { Vendor } from "./vendor.model.js";
import { City } from "./cities.model.js";
import { State } from "./states.model.js";
import { Country } from "./countries.model.js";

export interface AddressAttributes {
    addressId: number;
    addressLine: string;
    cityId: number;
    stateId: number;
    countryId: number;
    pincode: string;
    vendorId: number;
}

interface addressCreation extends Optional<AddressAttributes, "addressId"> { }

export class Address
    extends Model<AddressAttributes, addressCreation>
    implements AddressAttributes {
    public addressId!: number;
    public addressLine!: string;
    public cityId!: number;
    public stateId!: number;
    public countryId!: number;
    public pincode!: string;
    public vendorId!: number;
}

Address.init({
    addressId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    addressLine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: "cityId",
        },
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: "stateId",
        },
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: "countryId",
        },
    },
    pincode: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vendor,
            key: "vendorId",
        },
    },
}, {
    sequelize,
    tableName: "addresses",
});