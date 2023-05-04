import { Pet } from "../models";
import * as jwt from "jsonwebtoken";
import { index } from "../lib/algolia";

const secrect = process.env.SECRECT;

export async function createPet(id, data) {
   const pet = await Pet.create({
      name: data.name,
      img: data.img,
      lugar: data.lugar,
      lat: data.lat,
      lng: data.lng,
      UserId: id,
   });

   const algoliaRes = await index.saveObject({
      objectID: pet.get("id"),
      name: pet.dataValues.name,
      email: data.email,
      lugar: pet.dataValues.lugar,
      img: pet.dataValues.img,
      _geoloc: {
         lat: pet.dataValues.lat,
         lng: pet.dataValues.lng,
      },
   });

   return pet;
}
export async function getPetToken(token) {
   const tokenData = jwt.verify(token, secrect);
   const userId = tokenData.id;
   const user = await Pet.findAll({
      where: {
         UserId: userId,
      },
   });
   return user;
}
export async function modPet(id, data) {
   function modifPet(pet, id?) {
      const respuesta: any = {};
      if (pet.name) {
         respuesta.name = pet.name;
      }
      if (pet.lat && pet.lng) {
         respuesta._geoloc = {
            lat: pet.lat,
            lng: pet.lng,
         };
      }
      if (id) {
         respuesta.objectID = id;
      }
      return respuesta;
   }
   const actualizadoPet = await Pet.update(data, {
      where: {
         id: id,
      },
   });
   const newPet = await Pet.findByPk(id);

   const complete = await modifPet(newPet, id);

   await index.partialUpdateObject(complete);
   return newPet;
}
export async function deletePet(id) {
   const algoliaRes = await index.deleteObject(id);
   const petRes = await Pet.destroy({
      where: {
         id,
      },
   });
   return [algoliaRes, petRes];
}
export async function getPet(id) {
   const user = await Pet.findAll({
      where: {
         UserId: id,
      },
   });
   return user;
}
export async function getAllPets() {
   const pet = await Pet.findAll();

   return pet;
}
export async function getAllPetCerca(lat, lng) {
   try {
      const hits = await index.search("", {
         aroundLatLng: [lat, lng].join(","),
         aroundRadius: 10000,
      });

      return hits;
   } catch (e) {
      console.log(e);
   }
}
