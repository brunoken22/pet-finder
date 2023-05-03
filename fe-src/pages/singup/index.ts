import { Router } from "@vaadin/router";
import { state } from "../../state";
export class Singup extends HTMLElement {
   async connectedCallback() {
      this.render();
      const registro = this.querySelector(".login") as HTMLElement;
      registro.addEventListener("click", (e) => {
         Router.go("/login");
      });
      const form = this.querySelector(".btn") as HTMLElement;
      form.addEventListener("click", async (e) => {
         const name = (this.querySelector(".name") as HTMLInputElement).value;
         const email = (this.querySelector(".email") as HTMLInputElement).value;
         const password = (this.querySelector(".password") as HTMLInputElement)
            .value;
         const cs = state.getState();
         cs.fullName = name;
         cs.email = email;
         cs.password = password;
         const auth: any = await state.auth();
         console.log(auth);

         if (auth.findAuth) Router.go("/datos");
         else {
            alert("Usuario Existente");
         }
      });
   }
   render() {
      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
         <custom-barra></custom-barra>
         <div class="container">
            <form class="form-login row  mt-4">
               <h1 class="mb-3">Registrarse</h1>
               <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" class="form-control name" id="nombre" placeholder="Bruno Ken">
               </div>
               <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control email" id="email" placeholder="bruno_am_22@hotmail.com">
               </div>
               <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" class="form-control password" aria-labelledby="passwordHelpBlock">
               </div>
               <div class="mb-3">
                  <label for="repit-password" class="form-label">Repetir password</label>
                  <input type="password" id="repit-password" class="form-control" aria-labelledby="passwordHelpBlock">
               </div>
               <div class="botones">
                  <button type="button" class="btn btn-success btn-lg">Siguente</button>
               </div>
            </form>
            <p class="mt-5">Ya tenes cuenta?<a href="#" class="login"> Login</a></p>
         </div>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      `;
      const style = document.createElement("style");
      style.innerHTML = `
         body{
            background-color:#E5E5E5;
            height:100vh;
         }
         .container{
            font-family: 'Roboto', sans-serif;
            text-align:center;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            padding:3% 10%;
            padding-bottom:0
         }
         .form-login{
            max-width:400px
         }
         .form-login>div{
            text-align:start
         }
         h1{
            font-weight:bold
         }
         .botones{
            display:flex;
            flex-direction:column;
            justify-content: space-between;
            align-items:center
         }
      
      `;
      this.appendChild(style);
   }
}
customElements.define("page-singup", Singup);
