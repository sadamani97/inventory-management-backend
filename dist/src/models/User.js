import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
export class User extends Model {
    id;
    firstname;
    lastname;
    email;
    password;
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "User",
    timestamps: false,
});
//# sourceMappingURL=User.js.map