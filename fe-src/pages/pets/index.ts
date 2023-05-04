import { state } from "../../state";
import { Router } from "@vaadin/router";
import { sendSmtpEmail, apiInstance } from "../../lib/sendinblue";

export class Pets extends HTMLElement {
   async connectedCallback() {
      await state.init();

      this.render();
      const ubi = localStorage.getItem("ubi") as any;
      const dataUbi = JSON.parse(ubi);
      if (!dataUbi[0]) {
         Router.go("/welcome");
         return;
      }
      await state.getPetCerca(dataUbi[0], dataUbi[1]);

      const template = this.querySelector("#template") as HTMLTemplateElement;
      const petContainer = this.querySelector(".pets-cerca")!;

      for (let el of state.petsCerca) {
         const comprobar = this.querySelector(".com") as HTMLElement;
         if (!el) {
            comprobar.style.display = "flex";
         }
         comprobar.style.display = "none";

         const img = template.content.querySelector(".img") as HTMLImageElement;
         const nombre = template.content
            .querySelector(".card-body")!
            .querySelector(".nombre") as HTMLElement;

         const lugar = template.content
            .querySelector(".card-body")!
            .querySelector(".lugar") as HTMLElement;

         nombre.textContent = (el as any).name;
         lugar.textContent = (el as any).lugar;
         img.src = (el as any).img;
         const btn = template.content.querySelectorAll(".reportar");
         for (let els of btn) {
            els.setAttribute("id", (el as any).objectID);
         }
         let clone = document.importNode(template.content, true);
         petContainer.appendChild(clone);
      }
      const reports = this.querySelectorAll(".reportar");

      for (let link of reports) {
         link.addEventListener("click", (e: any) => {
            e.preventDefault();
            const form = this.querySelector(".pets-form") as any;

            const h2 = this.querySelector(".h2") as any;

            const pet = state.petsCerca.find(
               (el) => (el as any).objectID == e.target.getAttribute("id")
            );

            h2.textContent = "Reportar info de " + (pet as any).name;

            const nav = this.querySelector(".navs") as HTMLElement;
            const container = this.querySelector(".container") as HTMLElement;
            const x = this.querySelector(".pets-form-complet") as HTMLElement;
            x.style.display = "block";
            x.style.position = "absolute";
            form.style.display = "block";
            nav.style.opacity = "0.3";
            container.style.opacity = "0.3";
            form.addEventListener("submit", (e) => {
               e.preventDefault();

               const nombreRecib = (
                  this.querySelector(".nombre") as HTMLInputElement
               ).value;
               const tel = (this.querySelector(".telefono") as HTMLInputElement)
                  .value;
               const info = (
                  this.querySelector(".informacion") as HTMLInputElement
               ).value;

               const data = {
                  nombreRecib,
                  tel,
                  info,
                  namePet: (pet as any).name,
                  email: (pet as any).email,
               };

               sendinblue(data);
            });
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
      function sendinblue(data) {
         sendSmtpEmail.subject = `${data.namePet} fue vista`;
         sendSmtpEmail.htmlContent = `<html><body><h2>${data.info}</h2><br><a href="tel:${data.tel}">LLamar : ${data.tel}</a></body></html>`;
         sendSmtpEmail.sender = {
            name: data.nombreRecib,
            email: "bruno.am.59@gmail.com",
         };
         sendSmtpEmail.to = [{ email: data.email, name: data.nombre }];
         apiInstance.sendTransacEmail(sendSmtpEmail).then(
            function (res) {
               console.log(
                  "API called successfully. Returned data: " +
                     JSON.stringify(res)
               );
               alert("Mensaje Enviado");
               location.reload();
            },
            function (error) {
               console.error("error", error);
            }
         );
      }
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
               <input type="text" class="nombre form-control" id="nombre" placeholder="" required>
            </div>
            <div class="mb-3">
               <label for="telefono" class="form-label">Teléfono</label>
               <input type="tel" class="telefono form-control" id="telefono" placeholder="" required>
            </div>
            <div class="mb-3">
               <label for="donde" class="form-label">Dónde lo viste?</label>
               <textarea class="informacion form-control" id="donde" rows="3" required></textarea>
            </div>
            <div class="enviar">
               <button type="submit" class="btn btn-success">Enviar Información</button>
            </div>
         </form>
      </div>
         <custom-barra class="navs"></custom-barra>
         <div class="container">
      
            <h1>Mascotas perdidas cerca</h1>
            <div class="pets-cerca">
            </div>
            <div class="com">
               <h2 class="comprobar">No hay mascotas cerca</h2>
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
         .com{
            display:none;
            height: 40vh;
            display: flex;
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: center;
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
