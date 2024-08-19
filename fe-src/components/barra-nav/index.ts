import { Router, RouterLocation } from "@vaadin/router";
import { state } from "../../state";
const Api_url = process.env.API_URL || "http://localhost:3000";

const logo = require("../../img/logo.png");
class Barra extends HTMLElement {
   connectedCallback() {
      this.render();
      const cs = state.getState();

      const btns = this.shadowRoot!.querySelector(".navbar-end") as HTMLElement;
      const cerrar = this.shadowRoot!.querySelector(".cerrar") as HTMLElement;

      if (cs.fullName) {
         btns.style.display = "none";
         cerrar.style.display = "flex";
      } else {
         btns.style.display = "block";
         cerrar.style.display = "none";
      }
      const btnCerrar = this.shadowRoot!.querySelector(".btn-cerrar");
      btnCerrar!.addEventListener("click", (e) => {
         state.cerrarSesion();
         btns.style.display = "block";
         cerrar.style.display = "none";

         location.reload();
         Router.go("/login");
      });
      const navbarBurgers = this.shadowRoot!.querySelector(
         ".navbar-burger"
      ) as any;
      navbarBurgers.addEventListener("click", () => {
         const target = this.shadowRoot!.querySelector(".navbar-menu");

         navbarBurgers.classList.toggle("is-active");
         target!.classList.toggle("is-active");
      });
      const singup = this.shadowRoot!.querySelector(".singup") as HTMLElement;
      const login = this.shadowRoot!.querySelector(".login") as HTMLElement;

      singup.addEventListener("click", (e) => {
         Router.go("/singup");
      });
      login.addEventListener("click", (e) => {
         Router.go("/login");
      });
      const datos = this.shadowRoot!.querySelector(".datos") as HTMLElement;
      const reportes = this.shadowRoot!.querySelector(
         ".reportes"
      ) as HTMLElement;
      const reportar = this.shadowRoot!.querySelector(
         ".reportar"
      ) as HTMLElement;
      datos.addEventListener("click", (e) => {
         Router.go("/datos");
      });
      reportes.addEventListener("click", (e) => {
         Router.go("/myReport");
      });
      reportar.addEventListener("click", (e) => {
         Router.go("/newReport");
      });
      (this.shadowRoot as any)
         .querySelector(".inicio")
         .addEventListener("click", (e) => {

            if (location.href !== Api_url + "/pets") {
               Router.go("/welcome");
            }
         });
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");

      div.innerHTML = `
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
         <div class="navbar-brand">
            <a class="inicio navbar-item" href="#">
               <img src="${logo}" height="28">
            </a>
         
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
            </a>
         </div>
      
         <div id="navbarBasicExample" class="navbar-menu">
         <div class="navbar-start" >
            <a class="navbar-item datos">
               Mis datos
            </a>
      
            <a class="navbar-item reportes">
               Masctotas reportadas
            </a>
            
            <a class="navbar-item reportar">
               Reportar masctotas
            </a>
         </div>
      
            <div class="navbar-end">
               <div class="navbar-item">
                  <div class="buttons">
                     <a class="button is-primary singup">
                        <strong>Sign up</strong>
                     </a>
                     <a class="button is-light login">
                        Log in
                     </a>
                  </div>
               </div>
            </div>
            <div class="cerrar control" style="display:none;justify-content: center;align-items: center">
               <a class="btn-cerrar button is-danger is-rounded">Cerrar Sesión</a>
            </div>
         </div>
      </nav>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";  
        body{
        } 

        .navbar{
            background-color:#red;
         } 
         .navbar-burger span{
          color: #fff !important;
         }
         .nav
         .navbar-item{
          color: #fff !important;

         }
         .navbar-start{
          margin-left:40px
         }
         .cerrar{
            margin-right:1rem

         }
         @media(max-width:1020px){
            .buttons{
               display:flex !important;
               flex-direction:column !important;
               align-items: center!important;
               justify-content: center!important;
            }
            .navbar-start{
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               margin-left:0
            }
            
            .navbar-item{
               color: #000 !important;
               
            }
            .cerrar{
               margin-right:0 
           } 
          }
         `;

      shadow.appendChild(style);
      shadow.appendChild(div);
   }
}
customElements.define("custom-barra", Barra);
