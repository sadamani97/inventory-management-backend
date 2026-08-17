import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface SalesOrderAttributes {
  id: number;
  orderNumber: string;
  customerType: "Walk In Customer" | "Retail Customer" | "Wholesale Customer" | "Online Customer";
  customerName?: string;
  phone?: string;
  status: "Draft" | "Paid" | "Pending" | "Cancelled" | "Completed";
  paymentMode: "Cash" | "UPI" | "Card";
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
  public customerType!: "Walk In Customer" | "Retail Customer" | "Wholesale Customer" | "Online Customer";
  public customerName?: string;
  public phone?: string;
  public status!: "Draft" | "Paid" | "Pending" | "Cancelled" | "Completed";
  public paymentMode!: "Cash" | "UPI" | "Card";
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
      type: DataTypes.ENUM("Walk In Customer", "Retail Customer", "Wholesale Customer", "Online Customer"),
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
      type: DataTypes.ENUM("Draft", "Paid", "Pending", "Cancelled", "Completed"),
      allowNull: false,
      defaultValue: "Draft",
    },
    paymentMode: {
      type: DataTypes.ENUM("Cash", "UPI", "Card"),
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
