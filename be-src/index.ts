import * as path from "path";
import express from "express";
import cors from "cors";
import * as jwt from "jsonwebtoken";
import {
   createUser,
   getUser,
   getUserId,
   modiUser,
   getUserToken,
} from "./controllers/user-controllers";
import {
   createAuth,
   getAuth,
   singin,
   modiAuth,
} from "./controllers/auth-controllers";
import {
   createPet,
   getPet,
   getAllPets,
   modPet,
   deletePet,
   getPetToken,
   getAllPetCerca,
} from "./controllers/pet-controllers";
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "200mb" }));
const secrect = process.env.SECRECT;
const ruta = path.resolve(__dirname, "../dist");
app.get("/test", (req, res) => {
   console.log(process.env.PORT);

   res.json({
      enviroment: process.env.NODE_ENV,
   });
});

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
   res.json({ auth });
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

   try {
      if (auth) {
         const token = jwt.sign({ id: auth.get("UserId") }, secrect);
         res.json({
            token,
            auth,
            message: "Ingresastes",
         });
         return auth;
      }
   } catch (e) {
      res.status(400).json({
         message: "Contraseña Incorrecta o ususario incorrecto",
      });
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
   const token = req.headers.authorization.split(" ")[1];

   if (!token) {
      res.status(400).json({
         message: "Falta token",
      });
   }
   const user = await getUserToken(token);
   const pet = await getPetToken(token);

   res.json({ user, pet });
});

//Crea pet
app.post("/pet/:id", async (req, res) => {
   const { id } = req.params;
   if (!req.body) {
      res.status(400).json({
         message: "Faltan Datos",
      });
   }
   const pet = await createPet(id, req.body);

   res.json({ pet });
});

//Modifica Pet
app.put("/pet/:id", async (req, res) => {
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
});
//Elimina pet
app.delete("/pet/:id", async (req, res) => {
   const { id } = req.params;
   if (!id) {
      res.status(400).json({
         message: "Me faltan Datos",
      });
   }
   const [algoliaRes, petRes] = await deletePet(id);
   res.json({
      message: "Todo Ok",
      algoliaRes,
      petRes,
   });
});

//obtener Pet por ID
app.get("/pet/:id", async (req, res) => {
   const { id } = req.params;
   if (!id) {
      res.status(400).json({
         message: "Me falta datos",
      });
   }
   const pet = await getPet(id);
   res.json({ pet });
});
//obetiene todo los pets
app.get("/pets", async (req, res) => {
   const pet = await getAllPets();
   res.json({ pet });
});

app.get("/pet-cerca-de", async (req, res) => {
   const { lat, lng } = req.query;
   const respuesta = await getAllPetCerca(lat, lng);
   res.json([respuesta]);
});
app.get("/*", express.static(ruta));
app.get("/*", function (req, res) {
   res.sendFile(ruta + "/index.html");
});
app.listen(port, () => {
   console.log("http://localhost:" + port);
});
