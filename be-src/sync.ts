import {sequelize} from './models/conn';
import './models';
sequelize.sync({alter: true}).then((res) => {
  console.log(res);
});
