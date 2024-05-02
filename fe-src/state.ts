const Api_url = process.env.API_URL || 'http://localhost:3000';

const state = {
  data: {
    fullName: '',
    email: '',
    token: '',
    id: 0,
  },
  pets: [],
  petsCerca: [],
  idTemp: '',
  ubi: [],
  listeners: [],
  async init() {
    const token = await localStorage.token;
    if (token) {
      const respuesta = await fetch(Api_url + '/init/token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + JSON.parse(token),
        },
      });
      const res = await respuesta.json();

      const mod = {
        fullName: res.user.fullName,
        email: res.user.email,
        token: JSON.parse(token),
        id: res.user.id,
      };
      if (res.user.email) {
        this.setState(res.user.Pets);
      }
      this.setState(mod);
    }
    const ubi: any = localStorage.getItem('ubi');

    if (JSON.parse(ubi)) {
      state.ubi = JSON.parse(ubi);
    }
  },
  cerrarSesion() {
    localStorage.removeItem('token');
  },
  async auth() {
    const cs = this.getState();
    const auth = await fetch(Api_url + '/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
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
    const sing = await fetch(Api_url + '/auth/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res = await sing.json();

    if (res.message == 'Ingresastes') {
      const mod = {
        fullName: res.auth.fullName,
        email: res.auth.email,
        token: res.token,
        id: res.auth.id,
      };
      this.setState(mod);
    }
    return res;
  },
  async modificar() {
    const cs = this.getState();

    const respuesta = await fetch(Api_url + '/datos/' + cs.id, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cs),
    });
    const res = await respuesta.json();

    this.setState(res.user);
  },
  async createPet(data) {
    const res = await fetch(Api_url + '/pet', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          localStorage.getItem('token') &&
          JSON.parse(localStorage.getItem('token')!),
        ...data,
      }),
    });
    const respuestaJSON = await res.json();

    return respuestaJSON;
  },
  async getPetCerca(lat, lng) {
    const res = await fetch(Api_url + `/pet-cerca-de?lat=${lat}&lng=${lng}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);

    if (data[0]) {
      this.petsCerca = data[0].hits;
    }

    return data;
  },
  async modPet(newpets) {
    const respuesta = await fetch(Api_url + '/pet/' + this.idTemp, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newpets),
    });
    const res = await respuesta.json();

    return res;
  },
  async deletePet() {
    await fetch(Api_url + '/pet/' + this.idTemp, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      this.pets = [...newState];
      for (let cb of this.listeners) {
        cb();
      }
    }
    localStorage.setItem('token', JSON.stringify(this.data.token));
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
};

export {state};
