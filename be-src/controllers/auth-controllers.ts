import { Auth } from "../models";
import { cloudinary } from "../lib/cloudinary";
import * as crypto from "crypto";

function getSHA256ofString(text: string) {
   return crypto.createHash("sha256").update(text).digest("hex");
}
export async function createAuth(user, productData) {
   // const subir = await cloudinary.uploader.upload(productData.img);

   const [auth, findAuth] = await Auth.findOrCreate({
      where: {
         UserId: user.get("id"),
      },
      defaults: {
         fullName: productData.fullName,
         email: productData.email,
         password: getSHA256ofString(productData.password),
         UserId: user.get("id"),
      },
   });
   return [auth, findAuth];
}
export async function singin(data) {
   const passHasheada = getSHA256ofString(data.password);

   const auth = await Auth.findOne({
      where: {
         email: data.email,
         password: passHasheada,
      },
   });
   return auth;
}
export async function modiAuth(id, data) {
   const modi = await Auth.update(
      {
         fullName: data.fullName,
         email: data.email,
         password: getSHA256ofString(data.password),
      },
      {
         where: {
            id,
         },
      }
   );
   const auth = await Auth.findByPk(id);

   return auth.dataValues;
}
export async function getAuth() {
   const user = await Auth.findAll();
   return user;
}
