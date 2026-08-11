import { PurchaseOrder } from "./purchaseOrder.model.js";
import { PurchaseOrderItem } from "./purchaseOrderItem.model.js";
import { PurchaseOrderActivity } from "./purchaseOrderActivity.model.js";
import { createPO } from "./createPO.model.js";

import { Vendor, Address, VendorContact } from "../vendor/index.js";
import { Product } from "../product/product.model.js";
import { User } from "../User.js";

// PurchaseOrder <-> Vendor (belongsTo / hasMany)
PurchaseOrder.belongsTo(Vendor, { foreignKey: "vendorId", targetKey: "vendorId", as: "vendor" });
Vendor.hasMany(PurchaseOrder, { foreignKey: "vendorId", sourceKey: "vendorId", as: "purchaseOrders" });

// PurchaseOrder <-> Address (belongsTo / hasMany)
PurchaseOrder.belongsTo(Address, { foreignKey: "deliveryAddressId", targetKey: "addressId", as: "deliveryAddress" });
Address.hasMany(PurchaseOrder, { foreignKey: "deliveryAddressId", sourceKey: "addressId", as: "purchaseOrders" });

// PurchaseOrder <-> User (Created By) (belongsTo / hasMany)
PurchaseOrder.belongsTo(User, { foreignKey: "createdById", targetKey: "id", as: "createdBy" });
User.hasMany(PurchaseOrder, { foreignKey: "createdById", sourceKey: "id", as: "createdPurchaseOrders" });

// PurchaseOrder <-> PurchaseOrderItem (hasMany / belongsTo)
PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: "purchaseOrderId", as: "items" });
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: "purchaseOrderId", as: "purchaseOrder" });

// PurchaseOrderItem <-> Product (belongsTo / hasMany)
PurchaseOrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(PurchaseOrderItem, { foreignKey: "productId", as: "poItems" });

// PurchaseOrder <-> Activity Log (hasMany / belongsTo)
PurchaseOrder.hasMany(PurchaseOrderActivity, { foreignKey: "purchaseOrderId", as: "activities" });
PurchaseOrderActivity.belongsTo(PurchaseOrder, { foreignKey: "purchaseOrderId", as: "purchaseOrder" });

// PurchaseOrderActivity <-> User (belongsTo / hasMany)
PurchaseOrderActivity.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "user" });
User.hasMany(PurchaseOrderActivity, { foreignKey: "userId", sourceKey: "id", as: "userActivities" });

export {
    PurchaseOrder,
    PurchaseOrderItem,
    PurchaseOrderActivity,
    createPO,
};


