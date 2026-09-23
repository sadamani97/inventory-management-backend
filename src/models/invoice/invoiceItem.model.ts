import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface InvoiceItemAttributes {
  id: number;
  invoiceId: number;
  productId?: number | null;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface InvoiceItemCreationAttributes extends Optional<InvoiceItemAttributes, "id" | "productId"> {}

export class InvoiceItem
  extends Model<InvoiceItemAttributes, InvoiceItemCreationAttributes>
  implements InvoiceItemAttributes
{
  public id!: number;
  public invoiceId!: number;
  public productId?: number | null;
  public productName!: string;
  public quantity!: number;
  public unitPrice!: number;
  public totalPrice!: number;
}

InvoiceItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: "invoice_items",
    timestamps: true,
  }
);
