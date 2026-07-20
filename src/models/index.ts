import { Product } from "./product.model.js";
import {Category} from "./categories.model.js";



Product.belongsTo(Category,{
    foreignKey:"categoryId",
    as:"category",
});

Category.hasMany(Product,{
    foreignKey:"categoryId",
    as:"products",
});

export {
    Product,
    Category,
}