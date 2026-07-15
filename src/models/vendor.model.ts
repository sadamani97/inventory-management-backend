import { sequelize } from "../config/db.js"
import  { type DataType, DataTypes, Model, type Optional } from "sequelize";

export interface VendorAttributes{
    vendorId:number;
    vendorName:string;
    companyName:string;
    vendorType:string;
    contactPersonName:string;
    phoneNumber:number;
    emailAddress:string;
    website:string;
    addressLine:string;
    city:string;
    state:string;
    country:string;
    pincode:number;
}

interface vendorCreation extends Optional<VendorAttributes,"vendorId">{}
export class Vendor
extends Model<VendorAttributes,vendorCreation>
implements VendorAttributes {
    public vendorId!:number;
    public vendorName!:string;
    public companyName!:string;
    public vendorType!:string;
    public contactPersonName!:string;
    public phoneNumber!:number;
    public emailAddress!:string;
    public website!:string;
    public addressLine!:string;
    public city!:string;
    public state!:string;
    public country!:string;
    public pincode!:number;
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
    vendorType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactPersonName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressLine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "vendors",
});

