import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface InvoiceAttributes {
  id: number;
  invoiceNumber: string;
  salesOrderId?: number;
  salesOrderNumber?: string;
  customerName: string;
  phone?: string;
  status: "Draft" | "Paid" | "Pending" | "Partially Paid" | "Cancelled" | "Refunded" | "Overdue";
  paymentMethod: "Cash" | "UPI" | "Card" | "Net Banking" | "Credit" | "Cheque" | "Bank Transfer";
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  invoiceDate: Date;
  createdById?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface InvoiceCreationAttributes
  extends Optional<
    InvoiceAttributes,
    | "id"
    | "status"
    | "paymentMethod"
    | "totalItems"
    | "subtotal"
    | "discountAmount"
    | "invoiceDate"
  > {}

export class Invoice
  extends Model<InvoiceAttributes, InvoiceCreationAttributes>
  implements InvoiceAttributes
{
  public id!: number;
  public invoiceNumber!: string;
  public salesOrderId?: number;
  public salesOrderNumber?: string;
  public customerName!: string;
  public phone?: string;
  public status!: "Draft" | "Paid" | "Pending" | "Partially Paid" | "Cancelled" | "Refunded" | "Overdue";
  public paymentMethod!: "Cash" | "UPI" | "Card" | "Net Banking" | "Credit" | "Cheque" | "Bank Transfer";
  public totalItems!: number;
  public subtotal!: number;
  public discountAmount!: number;
  public totalAmount!: number;
  public invoiceDate!: Date;
  public createdById?: number;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salesOrderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Walk in Customer",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Paid", "Pending", "Partially Paid", "Cancelled", "Refunded", "Overdue"),
      allowNull: false,
      defaultValue: "Paid",
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "UPI", "Card", "Net Banking", "Credit", "Cheque", "Bank Transfer"),
      allowNull: false,
      defaultValue: "Cash",
    },
    totalItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    invoiceDate: {
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
    tableName: "invoices",
    timestamps: true,
  }
);
