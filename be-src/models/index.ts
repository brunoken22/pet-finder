import { User } from "./user";
import { Auth } from "./auth";
import { Pet } from "./pet";

User.hasOne(Auth);
User.hasMany(Pet);

export { Auth, User, Pet };
