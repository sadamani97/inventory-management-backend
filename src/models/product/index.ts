import { Product } from "./product.model.js";
import { Category } from "./categories.model.js";
import { Brand } from "./brand.model.js";
import { Unit } from "./unit.model.js";
import { Vendor } from "../vendor/vendor.model.js";

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(Vendor, {
    foreignKey: "vendorId",
    targetKey: "vendorId",
    as: "vendor",
});

Vendor.hasMany(Product, {
    foreignKey: "vendorId",
    sourceKey: "vendorId",
    as: "products",
});

Product.belongsTo(Brand, {
    foreignKey: "brandId",
    as: "brand",
});

Brand.hasMany(Product, {
    foreignKey: "brandId",
    as: "products",
});

Product.belongsTo(Unit, {
    foreignKey: "unitId",
    as: "unit",
});

Unit.hasMany(Product, {
    foreignKey: "unitId",
    as: "products",
});

export {
    Product,
    Category,
    Brand,
    Unit,
    Vendor,
}