import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { exactOptional } from "zod";
export class Product extends Model {
    id;
    productName;
    sku;
    barcode;
    category;
    brand;
    purchaseRate;
    sellingPrice;
    quantity;
    unit;
    addVarient;
}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    purchaseRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sellingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addVarient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "products",
});
//# sourceMappingURL=product.js.map