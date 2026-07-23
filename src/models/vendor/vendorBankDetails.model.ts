import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import { Vendor } from "./vendor.model.js";

export interface VendorBankDetailsAttributes {
    vendorBankDetailId: number;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    vendorId: number;
    isPrimary: boolean;
}

interface vendorBankDetailsCreation extends Optional<VendorBankDetailsAttributes, "vendorBankDetailId"> { }

export class VendorBankDetails
    extends Model<VendorBankDetailsAttributes, vendorBankDetailsCreation>
    implements VendorBankDetailsAttributes {
    public vendorBankDetailId!: number;
    public accountHolderName!: string;
    public bankName!: string;
    public accountNumber!: string;
    public ifscCode!: string;
    public branchName!: string;
    public vendorId!: number;
    public isPrimary!: boolean;
}

VendorBankDetails.init({
    vendorBankDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    accountHolderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ifscCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branchName: {
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
    isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: "vendorBankDetails",
});