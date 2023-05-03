import { Router } from "@vaadin/router";
import { state } from "../../state";
let img = require("../../img/login.png");
export class Login extends HTMLElement {
   async connectedCallback() {
      this.render();
      const registro = this.querySelector(".registro") as HTMLElement;
      registro.addEventListener("click", (e) => {
         Router.go("/singup");
      });
      const btn = this.querySelector(".btn") as HTMLElement;
      btn.addEventListener("click", async (e) => {
         const email = (this.querySelector(".email") as HTMLInputElement).value;
         const password = (this.querySelector(".password") as HTMLInputElement)
            .value;

         try {
            const res = await state.singin(email, password);
            if (res.message == "Ingresastes") {
               Router.go("./datos");
            }
         } catch (e) {
            alert("Contraseña o email incorrectos");
            console.log("Error", e);
         }
      });
   }
   render() {
      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
         <custom-barra></custom-barra>
         <div class="container">
            <img class="img" src="${img}">
            <form class="form-login row  mt-4">
               <h1 class="mb-3">Login</h1>
               <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control email" id="email" placeholder="bruno_am_22@hotmail.com">
               </div>
               <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" class="form-control password" aria-labelledby="passwordHelpBlock">
                  <a href="#"> <p>Olvidastes contraseña?</p></a>
               </div>
               <div class="botones">
                  <button type="button" class="btn btn-success btn-lg">Acceder</button>
               </div>
            </form>
            <p class="mt-4">Aún no tenes cuenta?<a href="#" class="registro"> Registrate</a></p>
         </div>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      `;
      const style = document.createElement("style");
      style.innerHTML = `
         body{
            background-color:#E5E5E5;
            height:100vh;
         }
         .img{
            max-height:150px;
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
            font-size:1.5rem;
            font-weight:bold
         }
         p{
            margin:0
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
customElements.define("page-login", Login);
