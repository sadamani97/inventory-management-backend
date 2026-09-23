import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface PurchaseOrderItemAttributes {
    id: number;
    purchaseOrderId: number; 
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number; 
    receivedQuantity?: number; 
}

interface PurchaseOrderItemCreationAttributes extends Optional<PurchaseOrderItemAttributes, "id" | "receivedQuantity"> {}

export class PurchaseOrderItem
    extends Model<PurchaseOrderItemAttributes, PurchaseOrderItemCreationAttributes>
    implements PurchaseOrderItemAttributes
{
    public id!: number;
    public purchaseOrderId!: number;
    public productId!: number;
    public quantity!: number;
    public unitPrice!: number;
    public totalPrice!: number;
    public receivedQuantity?: number;
}

PurchaseOrderItem.init(
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
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        receivedQuantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "purchase_order_items",
        timestamps: true,
    }
);
