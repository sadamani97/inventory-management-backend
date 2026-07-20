import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js"

export interface BrandAttributes {
    brandId: number;
    brandName: string;
}
interface BrandCreation extends Optional<BrandAttributes, "brandId"> { }

export class Brand
    extends Model<BrandAttributes, BrandCreation>
    implements BrandAttributes {
    public brandId!: number;
    public brandName!: string;
}
Brand.init({
    brandId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    brandName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Brand name is required",
            },
        },
    },
}, {
    sequelize,
    tableName: "brands",
    timestamps: true,
});

export default Brand;
