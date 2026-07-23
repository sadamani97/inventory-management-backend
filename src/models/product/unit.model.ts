import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db.js"

export interface UnitAttributes {
    unitId: number;
    unitName: string;
    quantity: number;
}
interface UnitCreation extends Optional<UnitAttributes, "unitId"> { }

export class Unit
    extends Model<UnitAttributes, UnitCreation>
    implements UnitAttributes {
    public unitId!: number;
    public unitName!: string;
    public quantity!: number;
}
Unit.init({
    unitId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    unitName: {
        type: DataTypes.ENUM(
            "g",
            "kg",
            "ml",
            "l",
            "packet",
            "roll",
            "tin",
            "box",
            "piece",
            "bottle"
        ),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "unit name is required",
            },
        },
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "unit qty is required",
            },
            isDecimal: {
                msg: "unit qty must be a number",
            },
        },
    },
}, {
    sequelize,
    tableName: "units",
    timestamps: true,
});

export default Unit;
