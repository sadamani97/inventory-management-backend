import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";

export interface CountryAttributes {
    countryId: number;
    countryName: string;
    countryCode: string;
}

interface countryCreation extends Optional<CountryAttributes, "countryId"> { }
export class Country
    extends Model<CountryAttributes, countryCreation>
    implements CountryAttributes {
    public countryId!: number;
    public countryName!: string;
    public countryCode!: string;
}

Country.init({
    countryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "countries",
});
