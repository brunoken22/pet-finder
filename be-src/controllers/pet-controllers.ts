import { Pet } from "../models";
import * as jwt from "jsonwebtoken";
import { index } from "../lib/algolia";
import { cloudinary } from "../lib/cloudinary";
const secrect = process.env.SECRECT;

export async function createPet(data) {
  const tokenData = jwt.verify(data.token, secrect);
  const imgSubida = await cloudinary.uploader.upload(data.img);
  const pet = await Pet.create({
    name: data.name,
    img: imgSubida.url,
    lugar: data.lugar,
    lat: data.lat,
    lng: data.lng,
    UserId: tokenData.id,
  });

  await index.saveObject({
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
export async function modPet(id: string, data) {
  const imgSubida = await cloudinary.uploader.upload(data.img);
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
  const newDataUpdate = { ...data, img: imgSubida.url };
  const actualizadoPet = await Pet.update(newDataUpdate, {
    where: {
      id: id,
    },
  });

  const complete = await modifPet(
    {
      ...data,
      img: imgSubida.url,
    },
    id
  );

  await index.partialUpdateObject(complete);
  return actualizadoPet;
}
export async function deletePet(id) {
  const petRes = await Pet.destroy({
    where: {
      id,
    },
  });
  if (!petRes) {
    return "Mascota no existe";
  }
  const algoliaRes = await index.deleteObject(id);
  return {
    message: "Todo Ok",
    algoliaRes,
    petRes,
  };
}
export async function getPet(id: string) {
  const pet = await Pet.findByPk(id);
  return pet;
}
export async function getAllPets() {
  const pets = await Pet.findAll();

  return pets;
}
export async function getAllPetCerca(lat: string, lng: string, email?: string, range?: string) {
  try {
    const rangeFilter = Number(range) > 10000 ? "all" : Number(range);
    const filter = email ? `NOT email:${email}` : "";
    const hits = await index.search("", {
      aroundLatLng: `${Number(lat)},${Number(lng)}`,
      filters: filter,
      aroundRadius: rangeFilter,
    });
    return hits;
  } catch (e) {
    return e.message;
  }
}
