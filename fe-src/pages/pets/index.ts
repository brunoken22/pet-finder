import { log } from "console";
import { state } from "../../state";

export class Pets extends HTMLElement {
   connectedCallback() {
      this.render();
      setTimeout(async () => {
         if (!state.ubi[0]) {
            return;
         }
         await state.getPetCerca(state.ubi[0], state.ubi[1]);
         const template = this.querySelector(
            "#template"
         ) as HTMLTemplateElement;
         const petContainer = this.querySelector(".pets-cerca");
         for (let el of state.petsCerca) {
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
            const btn = template.content.querySelectorAll(".reportar");
            for (let els of btn) {
               els.setAttribute("id", el.objectID);
            }
            let clone = document.importNode(template.content, true);
            petContainer.appendChild(clone);
         }
         const reports = this.querySelectorAll(".reportar");

         for (let el of reports) {
            el.addEventListener("click", (e: any) => {
               const form = this.querySelector(".pets-form") as any;
               const h2 = this.querySelector(".h2") as any;
               const pet = state.petsCerca.find(
                  (el) => el.objectID == e.target.getAttribute("id")
               );

               h2.textContent = "Reportar info de " + pet.name;
               const nav = this.querySelector(".navs") as HTMLElement;
               const container = this.querySelector(
                  ".container"
               ) as HTMLElement;
               const x = this.querySelector(
                  ".pets-form-complet"
               ) as HTMLElement;
               x.style.display = "block";
               x.style.position = "absolute";
               form.style.display = "block";
               nav.style.opacity = "0.3";
               container.style.opacity = "0.3";
               const close = this.querySelector(".btn-close") as HTMLElement;
               close.addEventListener("click", () => {
                  x.style.display = "none";
                  x.style.position = "unset";
                  form.style.display = "none";
                  nav.style.opacity = "1";
                  container.style.opacity = "1";
               });
            });
         }
      }, 2000);
   }
   render() {
      this.innerHTML = `
      <link
      href="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
      rel="stylesheet"
    />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <div class="pets-form-complet"  style="display:none"> 
         <form class="pets-form" style="display:none">          
            <div data-bs-theme="dark" class="btn-closes">
               <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <h2 class="h2">Reportar info de Bobby</h2>
            <div class="mb-3">
               <label for="nombre" class="form-label">Nombre</label>
               <input type="text" class="form-control" id="nombre" placeholder="">
            </div>
            <div class="mb-3">
               <label for="telefono" class="form-label">Teléfono</label>
               <input type="tel" class="form-control" id="telefono" placeholder="name@example.com">
            </div>
            <div class="mb-3">
               <label for="donde" class="form-label">Dónde lo viste?</label>
               <textarea class="form-control" id="donde" rows="3"></textarea>
            </div>
            <div class="enviar">
               <button type="button" class="btn btn-success">Enviar Información</button>
            </div>
         </form>
      </div>
         <custom-barra class="navs"></custom-barra>
         <div class="container">
      
            <h1>Mascotas perdidas cerca</h1>
            <div class="pets-cerca">
            </div>
            <template id="template">
               <div class="reportes">
                  <div class="card" style="width: 18rem;">
                     <img src="" alt="" class="img">
                     <div class="card-body">
                        <h5 class="nombre card-title">Bobby</h5>
                        <p class="lugar card-text">Nuñez, Buenos Aires,</p>
                        <a href="#" class="reportar btn btn-danger">Reportar</a>
                     </div>
                  </div>
               </div>
            </template>
         </div>
         <script src="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
         <script src="//unpkg.com/mapbox@1.0.0-beta9/dist/mapbox-sdk.min.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      `;
      const style = document.createElement("style");
      style.innerHTML = `
         body{
            background-color:#E5E5E5;
            height:100vh;
            font-family: 'Roboto';

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
         .pets-cerca{
            margin-top:5%;
            display: flex;
            column-gap: 10px;
            row-gap: 10px;
            justify-content: center;
            align-items: center;
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
         .btn-close{
            color:#fff !important;
         }
         h2{
            text-align:center;
            margin-bottom:10% !important;
            margin-top: 5% !important;
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
customElements.define("page-pets", Pets);
