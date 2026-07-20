import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/db.js"



export interface ProductAttributes{
    id:number;
    productName:string;
    sku:string;
    barcode:string;
    categoryId:number;
    brand:string;
    purchaseRate:number;
    sellingPrice:number;
    quantity:number;
    lowStockLimit:number,
    unit:string,
    status:string,
    description:string,
    addVarient:string;
}
interface productCreation extends Optional<ProductAttributes, "id"> {}
export class Product 
extends Model<ProductAttributes, productCreation>
implements ProductAttributes{
    public id!: number;
    public productName!: string;
    public sku!: string;
    public barcode!: string;
    public categoryId!: number;
    public brand!: string;
    public purchaseRate!: number;
    public sellingPrice!: number;
    public quantity!: number;
    public lowStockLimit!: number;
    public unit!: string;
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
        references: {
            model: "categories",
            key: "categoryId",
        },
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
    lowStockLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Active","Inactive"),
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
