const Api_url = "http://localhost:3000";
const state = {
   data: {
      fullName: "",
      email: "",
      token: "",
      id: 0,
   },
   pets: [],
   petsCerca: [],
   idTemp: "",
   ubi: [],
   listeners: [],
   async init() {
      if (localStorage.token) {
         const data = localStorage.getItem("token");
         if (data == '""' || data == "undefined") return;
         if (data || data !== "undefined") {
            const respuesta = await fetch(Api_url + "/init/token", {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + JSON.parse(data),
               },
            });
            const res = await respuesta.json();
            const mod = {
               fullName: res.user.fullName,
               email: res.user.email,
               token: JSON.parse(data),
               id: res.user.id,
            };
            this.setState(res.pet);
            this.setState(mod);
         }
      }
   },

   cerrarSesion() {
      localStorage.removeItem("token");
   },
   async auth() {
      const cs = this.getState();
      const auth = await fetch(Api_url + "/auth", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(cs),
      });
      const json = await auth.json();
      const res = await json;
      this.setState({
         ...res.auth,
         token: res.token,
      });
      return res;
   },
   async singin(email: string, password: string) {
      const singin = await fetch(Api_url + "/auth/token", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
         }),
      });
      const json = await singin.json();
      const res = await json;
      const mod = {
         fullName: res.auth.fullName,
         email: res.auth.email,
         token: res.token,
         id: res.auth.id,
      };
      this.setState(mod);
      this.init();
      return res;
   },
   async modificar() {
      const cs = this.getState();

      const respuesta = await fetch(Api_url + "/datos/" + cs.id, {
         method: "put",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(cs),
      });
      const res = await respuesta.json();

      this.setState(res.user);
   },
   async createPet(data) {
      const cs = this.getState();
      const res = await fetch(Api_url + "/pet/" + cs.id, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
      const respuestaJSON = await res.json();

      return respuestaJSON;
   },
   async getPetsAll() {
      const cs = this.getState();
      try {
         const respuesta = await fetch(Api_url + "/pets");
         const res = await respuesta.json();
         this.petsCerca.push(...res.pet);
      } catch (e) {
         console.log(e);
      }
   },
   async getPetCerca(lat, lng) {
      const res = await fetch(Api_url + `/pet-cerca-de?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      // console.log(data);
      this.petsCerca = data[0];

      return data;
      //  for (const comercio of results){
      //    const {lat,lng}=comercio._geoloc;

      //  }
   },
   async modPet(newpets) {
      const respuesta = await fetch(Api_url + "/pet/" + this.idTemp, {
         method: "put",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newpets),
      });
      const res = await respuesta.json();

      return res;
   },
   async deletePet() {
      await fetch(Api_url + "/pet/" + this.idTemp, {
         method: "delete",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      });
   },
   getState() {
      return this.data;
   },
   setState(newState) {
      if (newState.fullName) {
         this.data = newState;
      } else {
         this.pets.push(...newState);
         for (let cb of this.listeners) {
            cb();
         }
      }
      localStorage.setItem("token", JSON.stringify(this.data.token));
   },
   subscribe(callback) {
      this.listeners.push(callback);
   },
};

export { state };
