import { Product } from "./product/product.model.js";
import { Category } from "./product/categories.model.js";
import { Brand } from "./product/brand.model.js";
import { Unit } from "./product/unit.model.js";




Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "categoryId",
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
}