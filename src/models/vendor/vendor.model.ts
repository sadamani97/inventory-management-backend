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
    vendorCode?: string;
    panNumber?: string;
    currency?: string;
    creditLimit?: string;
    productCategory?: string;
    preferredProducts?: string;
    leadTime?: string;
    gstCertificate?: string;
    agreement?: string;
    vendorLogo?: string;
    isStarred?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
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
    public vendorCode!: string;
    public panNumber!: string;
    public currency!: string;
    public creditLimit!: string;
    public productCategory!: string;
    public preferredProducts!: string;
    public leadTime!: string;
    public gstCertificate!: string;
    public agreement!: string;
    public vendorLogo!: string;
    public isStarred!: boolean;
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
        type: DataTypes.ENUM('active', 'inactive', 'suspended', 'terminated'),
        allowNull: false,
        defaultValue: 'active',
    },
    vendorCode: { type: DataTypes.STRING, allowNull: true },
    panNumber: { type: DataTypes.STRING, allowNull: true },
    currency: { type: DataTypes.STRING, allowNull: true },
    creditLimit: { type: DataTypes.STRING, allowNull: true },
    productCategory: { type: DataTypes.STRING, allowNull: true },
    preferredProducts: { type: DataTypes.STRING, allowNull: true },
    leadTime: { type: DataTypes.STRING, allowNull: true },
    gstCertificate: { type: DataTypes.STRING, allowNull: true },
    agreement: { type: DataTypes.STRING, allowNull: true },
    vendorLogo: { type: DataTypes.STRING, allowNull: true },
    isStarred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: "vendors",
});

