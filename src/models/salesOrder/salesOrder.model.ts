import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface SalesOrderAttributes {
  id: number;
  orderNumber: string;
  customerType: "Walk In Customer" | "Retail Customer" | "Wholesale Customer" | "Online Customer" | "Corporate Customer" | "Distributor";
  customerName?: string;
  phone?: string;
  status: "Draft" | "Paid" | "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled" | "Returned" | "Failed";
  paymentMode: "Cash" | "UPI" | "Card" | "Net Banking" | "Credit" | "Cheque" | "Bank Transfer";
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  orderDate?: Date;
  createdById?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SalesOrderCreationAttributes extends Optional<SalesOrderAttributes, "id" | "status" | "subtotal" | "discountAmount" | "totalAmount"> {}

export class SalesOrder
  extends Model<SalesOrderAttributes, SalesOrderCreationAttributes>
  implements SalesOrderAttributes
{
  public id!: number;
  public orderNumber!: string;
  public customerType!: "Walk In Customer" | "Retail Customer" | "Wholesale Customer" | "Online Customer" | "Corporate Customer" | "Distributor";
  public customerName?: string;
  public phone?: string;
  public status!: "Draft" | "Paid" | "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled" | "Returned" | "Failed";
  public paymentMode!: "Cash" | "UPI" | "Card" | "Net Banking" | "Credit" | "Cheque" | "Bank Transfer";
  public subtotal!: number;
  public discountAmount!: number;
  public totalAmount!: number;
  public orderDate?: Date;
  public createdById?: number;
}

SalesOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customerType: {
      type: DataTypes.ENUM("Walk In Customer", "Retail Customer", "Wholesale Customer", "Online Customer", "Corporate Customer", "Distributor"),
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Paid", "Pending", "Processing", "Shipped", "Completed", "Cancelled", "Returned", "Failed"),
      allowNull: false,
      defaultValue: "Draft",
    },
    paymentMode: {
      type: DataTypes.ENUM("Cash", "UPI", "Card", "Net Banking", "Credit", "Cheque", "Bank Transfer"),
      allowNull: false,
      defaultValue: "Cash",
    },
    subtotal: {
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
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sales_orders",
    timestamps: true,
  }
);

export default SalesOrder;
