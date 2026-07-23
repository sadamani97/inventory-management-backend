import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";

export interface VendorTypeAttributes {
    vendorTypeId: number;
    typeName: string;
}

interface vendorTypeCreation extends Optional<VendorTypeAttributes, "vendorTypeId"> { }
export class VendorType
    extends Model<VendorTypeAttributes, vendorTypeCreation>
    implements VendorTypeAttributes {
    public vendorTypeId!: number;
    public typeName!: string;
}

VendorType.init({
    vendorTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    typeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "vendorTypes",
});