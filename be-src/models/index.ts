import {User} from './user';
import {Auth} from './auth';
import {Pet} from './pet';
import {sequelize} from './conn';

User.hasOne(Auth);
User.hasMany(Pet);
sequelize.sync({alter: true});

export {Auth, User, Pet};
