import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";

export interface CreatePOAttributes {
    poNumber: number;
    vendorName: string;
    orderDate: Date;
    expectedDeliveryDate: Date;
    paymentTerms: string;
    notes?: string;
    address: string;
    shipment: string;
}

interface CreatePOCreationAttributes extends Optional<CreatePOAttributes, "poNumber" | "notes"> {}

export class createPO
    extends Model<CreatePOAttributes, CreatePOCreationAttributes>
    implements CreatePOAttributes
{
    public poNumber!: number;
    public vendorName!: string;
    public orderDate!: Date;
    public expectedDeliveryDate!: Date;
    public paymentTerms!: string;
    public notes?: string;
    public address!: string;
    public shipment!: string;
}

createPO.init(
    {
        poNumber: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        vendorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expectedDeliveryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentTerms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "create_pos",
        timestamps: true,
    }
);
