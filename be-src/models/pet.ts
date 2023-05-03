import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";
export class Pet extends Model {}
Pet.init(
   {
      name: DataTypes.STRING,
      img: DataTypes.STRING(10000),
      lugar: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
   },
   {
      sequelize,
      modelName: "Pet",
   }
);
