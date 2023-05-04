import { Router } from "@vaadin/router";
import { state } from "../../state";
export class Datos extends HTMLElement {
   async connectedCallback() {
      await state.init();

      this.render();
      const cs = state.getState();
      const comprobar = this.querySelector(".com") as HTMLElement;
      const container = this.querySelector(".container") as HTMLElement;

      if (!cs.token) {
         container.style.display = "none";
      } else {
         comprobar.style.display = "none";
      }
      const that = this;
      const pass = that.querySelector(".pass") as HTMLElement;
      const cambPass = that.querySelector(".password") as HTMLElement;
      const datos = that.querySelector(".datos") as HTMLElement;
      const datoPers = that.querySelector(".datos-personales") as HTMLElement;
      const actuDato = that.querySelector(".actu-dato") as HTMLElement;
      const actuPass = that.querySelector(".actu-pass") as HTMLElement;

      modiPerso();
      modiPass();
      function modiPerso() {
         datos.addEventListener("click", (e) => {
            e.preventDefault();
            if (cambPass.style.display === "block") {
               cambPass.style.display = "none";
            }
            if (cambPass.style.display === "none") {
               datoPers.style.display = "block";
               pass.style.display = "block";
            }
            datos.style.display = "none";
         });
         actuDato.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = (
               that.querySelector(".email-value") as HTMLInputElement
            ).value;
            const name = (that.querySelector(".name-value") as HTMLInputElement)
               .value;
            const cs = state.getState();
            cs.fullName = name;
            cs.email = email;
            try {
               const respuesta = await state.modificar();
               alert("Datos actualizados");
            } catch (e) {
               alert("Algo salio mal");
            }
         });
      }
      function modiPass() {
         pass.addEventListener("click", (e) => {
            e.preventDefault();
            if (datoPers.style.display === "block") {
               datoPers.style.display = "none";
            }
            if (datoPers.style.display === "none") {
               cambPass.style.display = "block";
               datos.style.display = "block";
            }
            pass.style.display = "none";
         });
         actuPass.addEventListener("click", async (e) => {
            e.preventDefault();
            const password = (
               that.querySelector(".password-value") as HTMLInputElement
            ).value;
            // const name = (that.querySelector(".name-value") as HTMLInputElement)
            //    .value;
            const cs = state.getState();
            cs.password = password;
            try {
               const respuesta = await state.modificar();
               alert("Datos actualizados");
            } catch (e) {
               alert("Algo salio mal");
            }
         });
      }
   }

   render() {
      const cs = state.getState();

      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
         <custom-barra></custom-barra>
         <div class="com">
            <h2 class="comprobar">Ingrese a una cuenta o registrese</h2>
         </div>
            <div class="container">
            <h1>Mis Datos</h1>
            <div class="datos-personales" style="display:none">
               <div class="mb-3" disabled>
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control email-value" id="email" value="${
                     cs.email ? cs.email : ""
                  }">
               </div>
               <div class="mb-3">
                  <label for="name" class="form-label">Nombre</label>
                  <input type="text" class="form-control name-value" id="name"  value="${
                     cs.fullName ? cs.fullName : ""
                  }">
               </div>
               <button type="button" class="btn btn-success actu-dato">Actualizar</button>
            </div>
            <div class="password" style="display:none">
               <div class="mb-3">
                  <label for="contraseña" class="form-label">Contraseña</label>
                  <input type="password" class="form-control password-value" id="contraseña">
               </div>
               <div class="mb-3">
                  <label for="repetir-contraseña" class="form-label">Repetir contraseña</label>
                  <input type="password" class="form-control" id="repetir-contraseña" >
               </div>
               <button type="button" class="btn btn-success actu-pass">Actualizar</button>
            </div>
            <div class="botones">
               <custom-button class="datos" style="is-info" description="Modificar datos personales"></custom-button>
               <custom-button class="pass" style="is-info" description="Modificar contraseña"></custom-button>
            </div>
       
         </div>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      `;
      const style = document.createElement("style");
      style.innerHTML = `

         body{
            background-color:#E5E5E5;
            height:100vh;
         }
         .com{
            height: 50vh;
            display: flex;
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: center;
           }
         .container{
            font-family: 'Roboto', sans-serif;
            text-align:center;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            padding:3% 10%;
            padding-bottom:0;
         }
         h4{
            max-width:200px;
            font-size:1.3rem;
         }
         .botones{
            margin-top:10%;
            height:15vh;
            display:flex;
            flex-direction:column;
            justify-content: space-between;
            align-items:center;
         }
         .datos-personales,.password{
            min-width:50%;
            max-width:100%;
            margin-top:5%;
            margin-bottom:5%
         }
         .mb-3{
            text-align:start
         }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-datos", Datos);
