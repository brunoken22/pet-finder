import { Pet } from "../models";
import * as jwt from "jsonwebtoken";
import { index } from "../lib/algolia";

const secrect = process.env.SECRECT;

export async function createPet(id, data) {
   console.log(data.img);

   const pet = await Pet.create({
      name: data.name,
      lugar: data.lugar,
      img: data.img,
      lat: data.lat,
      lng: data.lng,
      UserId: id,
   });

   const algoliaRes = await index.saveObject({
      objectID: pet.get("id"),
      name: pet.dataValues.name,
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
   const { hits } = await index.search("", {
      aroundLatLng: [lat, lng].join(","),
      aroundRadius: 5000,
   });
   return hits;
}
