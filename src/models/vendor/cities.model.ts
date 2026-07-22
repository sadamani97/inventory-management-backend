import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import { State } from "./states.model.js";

export interface CityAttributes {
    cityId: number;
    cityName: string;
    stateId: number;
}

interface cityCreation extends Optional<CityAttributes, "cityId"> { }

export class City
    extends Model<CityAttributes, cityCreation>
    implements CityAttributes {
    public cityId!: number;
    public cityName!: string;
    public stateId!: number;
}

City.init({
    cityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    cityName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: "stateId",
        },
    },
}, {
    sequelize,
    tableName: "cities",
});