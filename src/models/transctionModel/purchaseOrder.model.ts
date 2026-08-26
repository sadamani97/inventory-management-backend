import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface PurchaseOrderAttributes {
    id: number;
    poNumber: string;
    vendorId: number; 
    deliveryAddressId: number; 
    orderDate: Date;
    expectedDeliveryDate: Date;
    paymentTerms: string; 
    shipmentMethod: string; 
    notes?: string;
    invoiceNumber?: string;
    status: "Draft" | "Pending" | "Approved" | "Shipped" | "Delivered" | "Partially Delivered" | "Cancelled" | "Delayed" | "Returned";
    paymentStatus: "NIL" | "Pending" | "Paid" | "Partially Paid" | "Refunded" | "Failed";
    subtotal: number;
    taxPercentage: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    createdById?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PurchaseOrderCreationAttributes extends Optional<PurchaseOrderAttributes, "id" | "status" | "paymentStatus" | "subtotal" | "taxPercentage" | "taxAmount" | "discountAmount"> {}

export class PurchaseOrder
    extends Model<PurchaseOrderAttributes, PurchaseOrderCreationAttributes>
    implements PurchaseOrderAttributes
{
    public id!: number;
    public poNumber!: string;
    public vendorId!: number;
    public deliveryAddressId!: number;
    public orderDate!: Date;
    public expectedDeliveryDate!: Date;
    public paymentTerms!: string;
    public shipmentMethod!: string;
    public notes?: string;
    public invoiceNumber?: string;
    public status!: "Draft" | "Pending" | "Approved" | "Shipped" | "Delivered" | "Cancelled" | "Delayed";
    public paymentStatus!: "NIL" | "Pending" | "Paid" | "Partially Paid";
    public subtotal!: number;
    public taxPercentage!: number;
    public taxAmount!: number;
    public discountAmount!: number;
    public totalAmount!: number;
    public createdById?: number;
}

PurchaseOrder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        poNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deliveryAddressId: {
            type: DataTypes.INTEGER,
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
        shipmentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        invoiceNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(
                "Draft",
                "Pending",
                "Approved",
                "Shipped",
                "Delivered",
                "Partially Delivered",
                "Cancelled",
                "Delayed",
                "Returned"
            ),
            defaultValue: "Draft",
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.ENUM("NIL", "Pending", "Paid", "Partially Paid", "Refunded", "Failed"),
            defaultValue: "NIL",
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        taxPercentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        taxAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        discountAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        createdById: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "purchase_orders",
        timestamps: true,
    }
);
