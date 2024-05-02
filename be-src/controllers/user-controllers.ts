import {Pet, User} from '../models';
import * as jwt from 'jsonwebtoken';
const secrect = process.env.SECRECT;

export async function createUser(productData) {
  const [user, findUser] = await User.findOrCreate({
    where: {
      email: productData.email,
    },
    defaults: {
      fullName: productData.fullName,
      email: productData.email,
    },
  });

  return [user, findUser];
}
export async function getUserToken(token) {
  const tokenData = jwt.verify(token, secrect);
  const userId = tokenData.id;
  const user = await User.findByPk(userId, {
    include: [Pet],
  });
  return user;
}
export async function getUserId(id) {
  const user = await User.findByPk(id, {
    include: [Pet],
  });
  return user;
}
export async function modiUser(id, data) {
  const modi = await User.update(
    {...data},
    {
      where: {
        id,
      },
    }
  );
  return data;
}
export async function getUser() {
  const user = await User.findAll();

  return user;
}
