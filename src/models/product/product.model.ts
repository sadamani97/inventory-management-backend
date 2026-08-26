import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js"



export interface ProductAttributes {
    id: number;
    productName: string;
    sku: string;
    barcode: string;
    categoryId: number;
    brandId: string;
    purchaseRate: number;
    sellingPrice: number;
    quantity: number;
    lowStockLimit: number,
    unitId: string,
    status: string,
    description: string,
    addVarient: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface productCreation extends Optional<ProductAttributes, "id"> { }
export class Product
    extends Model<ProductAttributes, productCreation>
    implements ProductAttributes {
    public id!: number;
    public productName!: string;
    public sku!: string;
    public barcode!: string;
    public categoryId!: number;
    public brandId!: string;
    public purchaseRate!: number;
    public sellingPrice!: number;
    public quantity!: number;
    public lowStockLimit!: number;
    public unitId!: string;
    public status!: string;
    public description!: string;
    public addVarient!: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    brandId: {
        type: DataTypes.INTEGER,
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
    lowStockLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Active", "Inactive", "Archived", "Draft", "Out of Stock"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addVarient: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: "products",
});
