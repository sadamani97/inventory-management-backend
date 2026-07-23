import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import { Vendor } from "./vendor.model.js";

export interface VendorContactAttributes {
    vendorContactId: number;
    name: string;
    email: string;
    mobile: string;
    vendorId: number;
}

interface vendorContactCreation extends Optional<VendorContactAttributes, "vendorContactId"> { }

export class VendorContact
    extends Model<VendorContactAttributes, vendorContactCreation>
    implements VendorContactAttributes {
    public vendorContactId!: number;
    public name!: string;
    public email!: string;
    public mobile!: string;
    public vendorId!: number;
}

VendorContact.init({
    vendorContactId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
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
    tableName: "vendorContacts",
});