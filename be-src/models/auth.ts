import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";
export class Auth extends Model {}
Auth.init(
   {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
   },
   {
      sequelize,
      modelName: "Auth",
   }
);
