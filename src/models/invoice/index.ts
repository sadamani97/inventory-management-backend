import { Invoice } from "./invoice.model.js";
import { InvoiceItem } from "./invoiceItem.model.js";
import { Product } from "../product/product.model.js";
import { User } from "../User.js";
import { SalesOrder } from "../salesOrder/index.js";

// Invoice <-> InvoiceItem (hasMany / belongsTo)
Invoice.hasMany(InvoiceItem, { foreignKey: "invoiceId", as: "items" });
InvoiceItem.belongsTo(Invoice, { foreignKey: "invoiceId", as: "invoice" });

// InvoiceItem <-> Product (belongsTo / hasMany)
InvoiceItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(InvoiceItem, { foreignKey: "productId", as: "invoiceItems" });

// Invoice <-> User (createdBy)
Invoice.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });
User.hasMany(Invoice, { foreignKey: "createdById", as: "invoices" });

// Invoice <-> SalesOrder
Invoice.belongsTo(SalesOrder, { foreignKey: "salesOrderId", as: "salesOrder" });
SalesOrder.hasMany(Invoice, { foreignKey: "salesOrderId", as: "invoices" });

export { Invoice, InvoiceItem };
