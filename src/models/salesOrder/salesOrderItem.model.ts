import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

export interface SalesOrderItemAttributes {
  id: number;
  salesOrderId: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface SalesOrderItemCreationAttributes extends Optional<SalesOrderItemAttributes, "id" | "productName"> {}

export class SalesOrderItem
  extends Model<SalesOrderItemAttributes, SalesOrderItemCreationAttributes>
  implements SalesOrderItemAttributes
{
  public id!: number;
  public salesOrderId!: number;
  public productId!: number;
  public productName?: string;
  public quantity!: number;
  public unitPrice!: number;
  public totalPrice!: number;
}

SalesOrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(150),
      allowNull: true,
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
    tableName: "sales_order_items",
    timestamps: true,
  }
);

export default SalesOrderItem;
