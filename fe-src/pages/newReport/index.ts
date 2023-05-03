import { Router } from "@vaadin/router";
import { state } from "../../state";
import * as mapboxgl from "mapbox-gl";
import { initMapbox, geocoder } from "../../lib/mapbox";
import { initDropzone } from "../../lib/dropzone";
import { log } from "console";
class Report extends HTMLElement {
   connectedCallback() {
      this.render();
      const cs = state.getState();
      const comprobar = this.querySelector(".com") as HTMLElement;
      const container = this.querySelector(".container") as HTMLElement;
      console.log(comprobar, container);

      if (!cs.token) {
         container.style.display = "none";
      } else {
         comprobar.style.display = "none";
      }
      const mapboxUbi = this.querySelector(".mapbox-ubi");
      const btn = this.querySelector(".formulario");

      btn.addEventListener("submit", async (e) => {
         const nameInput = (
            that.querySelector(".name-input") as HTMLInputElement
         ).value;
         const res = await state.createPet({
            name: nameInput,
            lugar: dataAGuardar["lugar"],
            img: dataAGuardar["dataUrl"],
            lat: dataAGuardar["lat"],
            lng: dataAGuardar["lng"],
         });
         alert("Reportado");
         Router.go("/welcome");
      });
      const that = this;
      dataDropzone();
      dataMapbox(mapboxUbi);
      const dataAGuardar = {};
      function dataMapbox(el: Element | null) {
         const map = initMapbox(el);
         const search = that.querySelector(".search") as HTMLInputElement;

         search.appendChild(geocoder.onAdd(map));
         geocoder.on("result", function (e) {
            const result = e.result;
            const [lng, lat] = result.geometry.coordinates;
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
            map.setCenter([lng, lat]);
            map.setZoom(14);
            dataAGuardar["lugar"] = result.place_name;
            dataAGuardar["lng"] = lng;
            dataAGuardar["lat"] = lat;
         });
      }
      function dataDropzone() {
         const imgPet: any = that.querySelector(".imagen");
         const myDropzone = initDropzone(".foto");
         myDropzone.on("thumbnail", function (file) {
            imgPet.src = file.dataURL;
            const component = document
               .querySelector(".dz-preview")
               .querySelectorAll("div");

            for (let el of component) {
               el.style.display = "none";
            }
            const imagen = document.querySelector(".imagen") as any;
            imagen.src = file.dataURL;
            imagen.style.display = "block";
            dataAGuardar["dataUrl"] = file.dataURL;
         });
      }
   }

   render() {
      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <custom-barra></custom-barra>
      <div class="com">
         <h2 class="comprobar">Ingrese a una cuenta o registrese</h2>
      </div>
      <div class="container pt-3">
         <h1>Reportar mascota perdida</h1>
         <form class="formulario">
            <div class="report__form">
               <div class="mb-3">
                  <label for="name" class="form-label">Nombre</label>
                  <input type="text" class="form-control name-input" id="name" placeholder="Bobby" required>
               </div>
               <div class="report__form-dropzone">   
                  <div class="foto btn btn-outline-primary" required>Subir Foto</div>
                     <div class="text-center">
                        <img src="#" alt="" width="120px" height="135px" style="display: none;" class="imagen rounded img-fluid">
                     </div>
                  </div>
               <div class="report__form-mapbox">
                  <div class="mapbox-ubi" style='width: 100%; height: 250px;'></div>
                  <div class='search' required></div>
               </div>
               <button type="submit" class="enviar btn btn-success mt-3 mb-2">Reportar</button>
            </div>
         </form>
      </div> 
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    `;

      const style = document.createElement("style");
      style.innerHTML = `
      body{
         background-color: #E5E5E5;
      }
        .report {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .com{
         height: 50vh;
         display: flex;
         flex-direction: column-reverse;
         justify-content: flex-start;
         align-items: center;
        }
        .container{
            max-width:500px !important;
        }
        .report__form{
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .report__form-label,
        .report__form-mapbox-label{
          display: flex;
          flex-direction: column;
          font-size: 16px;
        }
      .report__form-label > input,
      .report__form-mapbox-label > input{
        font-family: 'Poppins', sans-serif;
        padding: 8px 0;
        font-size: 16px;
      }
      .imagen{
         width: 100%;
         object-fit: contain;
         height: 150px;
       }

      .report__form-dropzone,
      .report__form-mapbox{
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .report__form-mapbox-map{
        margin: 0 auto;
      }
      .search > .mapboxgl-ctrl-geocoder{
        width: 100%;
        max-width: none
      }
      `;
      this.appendChild(style);
   }
}
customElements.define("page-newreport", Report);
