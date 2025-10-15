import * as path from "path";
import express from "express";
import cors from "cors";
import * as jwt from "jsonwebtoken";
import { sendinblue } from "./lib/sendinblue";
import {
  createUser,
  getUser,
  getUserId,
  modiUser,
  getUserToken,
} from "./controllers/user-controllers";
import { createAuth, getAuth, singin, modiAuth } from "./controllers/auth-controllers";
import {
  createPet,
  getPet,
  getAllPets,
  modPet,
  deletePet,
  getAllPetCerca,
} from "./controllers/pet-controllers";
import { SUCCESS } from "dropzone";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
const secrect = process.env.SECRECT;
const ruta = path.resolve(__dirname, "../dist");

app.post("/auth", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Faltan Datos",
    });
  }
  const [user, findUser] = (await createUser(req.body)) as any;
  const token = jwt.sign({ id: user.get("id") }, secrect);
  const [auth, findAuth] = await createAuth(user, req.body);

  res.json({ auth, findAuth, token });
});

app.get("/user", async (req, res) => {
  const users = await getUser();
  res.json({ users });
});

app.get("/auth", async (req, res) => {
  const auth = await getAuth();
  res.status(200).json(auth);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Me falta datos",
    });
  }
  const user = await getUserId(id);
  res.json({ user });
});

// signin
app.post("/auth/token", async (req, res) => {
  const auth = await singin(req.body);
  if (auth) {
    const token = jwt.sign({ id: auth.get("UserId") }, secrect);
    res.json({
      token,
      auth,
      message: "Ingresastes",
    });
    return auth;
  } else {
    res.json({ message: "Incorreto" });
  }
});
// async function authMiddleeware(req, res, next) {
//    const token = req.headers.authorization.split(" ")[1];
//    try {
//       const data = jwt.verify(token, secrect);
//       req._user = data;
//       next();
//    } catch (e) {
//       res.status(401).json({
//          error: true,
//       });
//    }
// }
// app.get("/me", authMiddleeware, async (req, res) => {
//    const user = await getUserId(req._user.id);
//    res.json({ user });
// });

//Modificar
app.put("/datos/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    res.status(400).json({
      message: "Faltan Datos",
    });
  }
  if (req.body) {
    const respuesta = {};
    if (req.body.fullName && req.body.email) {
      const user = await modiUser(id, req.body);
      respuesta["user"] = user;
    }
    if (req.body.password) {
      const auth = await modiAuth(id, req.body);
      respuesta["auth"] = auth;
    }

    res.json(respuesta);
  }
});

//Mantener iniciado
app.get("/init/token", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(400).json({
        message: "Falta token",
      });
    }
    const user = await getUserToken(token);
    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//Crea pet
app.post("/pet", async (req, res) => {
  try {
    const { token, name, lat, lng, lugar, img } = req.body;
    if (!token || !name || !lat || !lng || !lugar || !img) {
      res.status(400).json({
        message: "Faltan Datos",
      });
    }
    const pet = await createPet(req.body);
    res.status(200).json({ pet });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//Modifica Pet
app.put("/pet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !req.body) {
      res.status(400).json({
        message: "Me faltan Datos",
      });
    }
    const algoliaRes = await modPet(id, req.body);
    res.json({
      message: "Todo Ok",
      algoliaRes,
    });
  } catch (e: any) {
    console.error("ESTE ES EL ERROR: ", e);
    res.status(500).json({ message: e.message });
  }
});
//Elimina pet
app.delete("/pet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Me faltan Datos",
      });
    }
    const responseData = await deletePet(id);
    res.status(200).json(responseData);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//obtener Pet por ID
app.get("/pet/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Falta el id",
    });
    return;
  }
  const pet = await getPet(id);
  if (!pet.dataValues.id) {
    res.status(200).json({
      success: false,
      message: "No se encontro la mascota",
    });
    return;
  }
  res.status(200).json({
    success: true,
    pet,
  });
});
//obetiene todo los pets
app.get("/pets", async (req, res) => {
  try {
    const pet = await getAllPets();
    res.json({ pet });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/pet-cerca-de", async (req, res) => {
  const { lat, lng, email } = req.query;

  const respuesta: any = await getAllPetCerca(lat, lng, email);
  res.status(200).json([respuesta]);
});
app.post("/sendinblue", async (req, res) => {
  try {
    if (!req.body) {
      res.json({
        message: "Error",
      });
      return;
    }
    const send = await sendinblue(req.body);
    res.json({
      send,
      message: "ok",
    });
  } catch (e: any) {
    res.json(e.message);
  }
});

app.use(express.static(ruta));

app.get("*", function (req, res) {
  res.sendFile(ruta + "/index.html");
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
