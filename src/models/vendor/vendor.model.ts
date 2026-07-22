import { sequelize } from "../../config/db.js"
import { type DataType, DataTypes, Model, type Optional } from "sequelize";

export interface VendorAttributes {
    vendorId: number;
    vendorName: string;
    companyName: string;
    vendorTypeId: number;
    website: string;
    gstin:string;
    status:string;
}

interface vendorCreation extends Optional<VendorAttributes, "vendorId"> { }
export class Vendor
    extends Model<VendorAttributes, vendorCreation>
    implements VendorAttributes {
    public vendorId!: number;
    public vendorName!: string;
    public companyName!: string;
    public vendorTypeId!: number;
    public website!: string;
    public gstin!: string;
    public status!: string;
}

Vendor.init({
    vendorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
   website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active','inactive'),
        allowNull: false,
        defaultValue: 'active',
    },
}, {
    sequelize,
    tableName: "vendors",
});

