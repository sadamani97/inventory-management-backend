import { sequelize } from "../../config/db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import { Country } from "./countries.model.js";

export interface StateAttributes {
    stateId: number;
    stateName: string;
    countryId: number;
}

interface stateCreation extends Optional<StateAttributes, "stateId"> { }

export class State
    extends Model<StateAttributes, stateCreation>
    implements StateAttributes {
    public stateId!: number;
    public stateName!: string;
    public countryId!: number;
}

State.init({
    stateId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    stateName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: "countryId",
        },
    },
}, {
    sequelize,
    tableName: "states",
});