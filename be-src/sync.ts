import { sequelize } from "./models/conn";
import "./models";

sequelize.sync({ force: true }).then((res) => {
   console.log(res);
});
