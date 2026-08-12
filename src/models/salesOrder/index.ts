import { SalesOrder } from "./salesOrder.model.js";
import { SalesOrderItem } from "./salesOrderItem.model.js";
import { Product } from "../product/product.model.js";
import { User } from "../User.js";

// SalesOrder <-> SalesOrderItem (one-to-many)
SalesOrder.hasMany(SalesOrderItem, {
  foreignKey: "salesOrderId",
  as: "items",
});

SalesOrderItem.belongsTo(SalesOrder, {
  foreignKey: "salesOrderId",
  as: "salesOrder",
});

// SalesOrderItem <-> Product (belongsTo) join by productId
SalesOrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Product.hasMany(SalesOrderItem, {
  foreignKey: "productId",
  as: "salesOrderItems",
});

// Created-by relationship join to the user table reuse
SalesOrder.belongsTo(User, {
  foreignKey: "createdById",
  targetKey: "id",
  as: "createdBy",
});

User.hasMany(SalesOrder, {
  foreignKey: "createdById",
  sourceKey: "id",
  as: "salesOrders",
});

export {
  SalesOrder,
  SalesOrderItem,
};
