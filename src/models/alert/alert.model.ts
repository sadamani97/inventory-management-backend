import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface AlertAttributes {
    id: number;
    title: string;
    relatedItem: string;
    referenceId?: string;
    type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'ITEM_EXPIRING' | 'VENDOR_DELAY' | 'PAYMENT_REMINDER' | 'SHIPMENT_DELAY' | 'CANCELLED_PO';
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Active' | 'Delayed' | 'In Transit' | 'Pending' | 'Cancelled' | 'Resolved';
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AlertCreationAttributes extends Optional<AlertAttributes, "id"> {}

export class Alert extends Model<AlertAttributes, AlertCreationAttributes> implements AlertAttributes {
    public id!: number;
    public title!: string;
    public relatedItem!: string;
    public referenceId?: string;
    public type!: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'ITEM_EXPIRING' | 'VENDOR_DELAY' | 'PAYMENT_REMINDER' | 'SHIPMENT_DELAY' | 'CANCELLED_PO';
    public severity!: 'Critical' | 'High' | 'Medium' | 'Low';
    public status!: 'Active' | 'Delayed' | 'In Transit' | 'Pending' | 'Cancelled' | 'Resolved';
    public description?: string;
}

Alert.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relatedItem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        referenceId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM(
                'LOW_STOCK',
                'OUT_OF_STOCK',
                'ITEM_EXPIRING',
                'VENDOR_DELAY',
                'PAYMENT_REMINDER',
                'SHIPMENT_DELAY',
                'CANCELLED_PO'
            ),
            allowNull: false,
            defaultValue: 'LOW_STOCK',
        },
        severity: {
            type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
            allowNull: false,
            defaultValue: 'Medium',
        },
        status: {
            type: DataTypes.ENUM('Active', 'Delayed', 'In Transit', 'Pending', 'Cancelled', 'Resolved'),
            allowNull: false,
            defaultValue: 'Active',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "alerts",
    }
);
