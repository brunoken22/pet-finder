import { Router } from "@vaadin/router";
import { state } from "../../state";
let img = require("../../img/refer.png");
export class Welcome extends HTMLElement {
   connectedCallback() {
      setTimeout(() => {
         this.render();
         const ubication = this.querySelector(".ubication");

         ubication.addEventListener("click", (e) => {
            e.preventDefault();
            const ubi = navigator.geolocation.getCurrentPosition(succes, error);
         });
         function succes(position) {
            state.ubi.push(position.coords.latitude);
            state.ubi.push(position.coords.longitude);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            Router.go("/pets");
         }
         function error() {
            console.log("No Permitido");
         }
      }, 500);
   }
   render() {
      this.innerHTML = `
         <custom-barra></custom-barra>
         <div class="container">
            <img src="${img}">
            <h1>Pet Finder APP</h1>
            <h4>Encontrá y reportá mascotas perdidas cerca de tu ubicación</h4>
            <div class="botones">
               <custom-button class="ubication" style="is-success" description="Dar mi ubicación actual"></custom-button>
               <custom-button style="is-info" description="¿Cómo funciona Pet Finder?"></custom-button>
            </div>
         </div>
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
         h1{
            font-size:1.5rem
         }
         h4{
            max-width:200px;
            font-size:1.1rem;
         }
         .botones{
            height:15vh;
            display:flex;
            flex-direction:column;
            justify-content: space-between;
            align-items:center
         }
      
      `;
      this.appendChild(style);
   }
}
customElements.define("page-welcome", Welcome);
