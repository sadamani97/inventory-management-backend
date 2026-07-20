import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js"

export interface CategoryAttributes {
    categoryId: number;
    categoryName: string;
}
interface CategoryCreation extends Optional<CategoryAttributes, "categoryId"> { }

export class Category
    extends Model<CategoryAttributes, CategoryCreation>
    implements CategoryAttributes {
    public categoryId!: number;
    public categoryName!: string;
}
Category.init({
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    categoryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Category name is required",
            },
        },
    },
}, {
    sequelize,
    tableName: "categories",
    timestamps: true,
});

export default Category;
