import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
export declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
//# sourceMappingURL=User.d.ts.map