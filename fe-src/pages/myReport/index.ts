import { Router } from "@vaadin/router";
import { state } from "../../state";
import { subscribe } from "diagnostics_channel";
export class Reportes extends HTMLElement {
   async connectedCallback() {
      this.render();
      const cs = state.getState();
      const comprobar = this.querySelector(".com") as HTMLElement;
      const container = this.querySelector(".container") as HTMLElement;

      if (!cs.token) {
         container.style.display = "none";
      } else {
         comprobar.style.display = "none";
      }
      setTimeout(async () => {
         const template = this.querySelector(
            "#template"
         ) as HTMLTemplateElement;
         const petContainer = this.querySelector(".pets-cerca");
         for (let el of state.pets) {
            const img = template.content.querySelector(
               ".img"
            ) as HTMLImageElement;

            const nombre = template.content
               .querySelector(".card-body")
               .querySelector(".nombre");

            const lugar = template.content
               .querySelector(".card-body")
               .querySelector(".lugar");
            nombre.textContent = el.name;
            lugar.textContent = el.lugar;
            img.src = el.img;
            const btn = template.content.querySelectorAll(".btn");
            for (let els of btn) {
               els.setAttribute("id", el.id);
            }
            let clone = document.importNode(template.content, true);
            petContainer.appendChild(clone);
         }
         const editar = this.querySelectorAll(".editar");
         editar.forEach((el) => {
            el.addEventListener("click", (e) => {
               state.idTemp = el.getAttribute("id");
               Router.go("/editReport");
            });
         });
         const borrar = this.querySelectorAll(".borrar");
         borrar.forEach((el) => {
            el.addEventListener("click", async (e) => {
               state.idTemp = el.getAttribute("id");
               await state.deletePet();
               alert("Eliminado");
               location.reload();
            });
         });
      }, 1500);
   }

   render() {
      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
         <custom-barra class="navs"></custom-barra>
         <div class="com">
            <h2 class="comprobar">Ingrese a una cuenta o registrese</h2>
         </div>
         <template id="template">
            <div id="">
               <div class="card" style="width: 18rem;">
                  <img src="" alt="" class="img">
                  <div class="card-body">
                     <h5 class="card-title nombre" ></h5>
                     <p class="card-text lugar" ></p>
                     <div class="botones" >
                        <button class="editar btn btn-primary">Editar</button>
                        <button class="borrar btn btn-outline-danger">Eliminar</button>
                     </div>
                  </div>
               </div>
            </div>
         </template>
         <div class="container">
            <h1>Mascotas Reportadas</h1>
            <div class="pets-cerca"></div>
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
            text-align:center;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            padding:3% 10%;
            padding-bottom:0
         }
         .btn-closes{
            display: flex;
            justify-content: end;
         
         }
         h4{
            max-width:200px;
            font-size:1.3rem;
         }
         .botones{
            display:flex;
            justify-content: space-between;
         }
         .pets-cerca{
            margin-top:5%;
            display: flex;
            column-gap: 10px;
            row-gap: 10px;
            justify-content: center;
            align-items: start;
            width: 90vw;
            flex-wrap: wrap;
         }
         .pets-form-complet{
            position:absolute;
            top:0;
            right:0;
            left:0;
            bottom:0;
            z-index:1;
         }
         .pets-form{
            position:absolute;
            top:10%;
            left:10%;
            right:10%;
            text-align:start;
            max-width:350px;
            background-color:#26302E;
            color:#fff;
            margin:auto;
            padding:15px;
            border-radius:15px;
          
         }
         p{
            max-height: 50px;
            overflow: hidden;
         }
         .btn-close{
            color:#fff !important;
         }
       

         .enviar{
            display:flex;
            justify-content:center;
            margin-top:10% !important; 

         }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-myreport", Reportes);
// h2{
//    text-align:center;
//    margin-bottom:10% !important;
//    margin-top: 5% !important;
// }
