import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface PurchaseOrderActivityAttributes {
    id: number;
    purchaseOrderId: number;
    activityType: "PO Created" | "Delivery Received" | "PO Cancelled" | "Vendor Updated" | "Stock Updated";
    description: string;
    userId?: number;
}

interface PurchaseOrderActivityCreationAttributes extends Optional<PurchaseOrderActivityAttributes, "id"> {}

export class PurchaseOrderActivity
    extends Model<PurchaseOrderActivityAttributes, PurchaseOrderActivityCreationAttributes>
    implements PurchaseOrderActivityAttributes
{
    public id!: number;
    public purchaseOrderId!: number;
    public activityType!: "PO Created" | "Delivery Received" | "PO Cancelled" | "Vendor Updated" | "Stock Updated";
    public description!: string;
    public userId?: number;
}

PurchaseOrderActivity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        purchaseOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activityType: {
            type: DataTypes.ENUM(
                "PO Created",
                "Delivery Received",
                "PO Cancelled",
                "Vendor Updated",
                "Stock Updated"
            ),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "purchase_order_activities",
        timestamps: true,
    }
);
