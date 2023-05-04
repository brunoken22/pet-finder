import { Router } from "@vaadin/router";
import { state } from "../../state";
import * as mapboxgl from "mapbox-gl";
import { initDropzone } from "../../lib/dropzone";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN;

class EditReport extends HTMLElement {
   async connectedCallback() {
      await state.init();

      this.render();

      const mapboxUbi = this.querySelector(".mapbox-ubi");

      const that = this;
      dataDropzone();
      dataMapbox(mapboxUbi);
      const dataAGuardar = {};
      function dataMapbox(el: Element | null) {
         const pet = state.pets.find(
            (item) => item.id === Number(state.idTemp)
         );

         function initMapbox(mapElement) {
            return new mapboxgl.Map({
               container: mapElement,
               style: "mapbox://styles/mapbox/streets-v11",
               center: [pet.lng, pet.lat],
               zoom: 13,
               dragPan: true,
               scrollZoom: true,
            });
         }
         const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: "ar",
            autocomplete: true,
            language: "es",
            placeholder: `${pet.lugar}`,
            marker: false,
         });
         const map = initMapbox(el);
         const search = that.querySelector(".search") as HTMLInputElement;
         new mapboxgl.Marker().setLngLat([pet.lng, pet.lat]).addTo(map);

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
         search.appendChild(geocoder.onAdd(map));
         const btn = that.querySelector(".enviar");
         function lastData(newData) {
            if (!newData) {
               throw "Error";
            }
            if (!newData.lugar) {
               dataAGuardar["lugar"] = pet.lugar;
            }
            if (!newData.dataUrrl) {
               dataAGuardar["dataUrl"] = pet.img;
            }
            if (!newData.lat) {
               dataAGuardar["lat"] = pet.lat;
            }
            if (!newData.lng) {
               dataAGuardar["lng"] = pet.lng;
            }
         }
         btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const nameInput = (
               that.querySelector(".name-input") as HTMLInputElement
            ).value;
            lastData(dataAGuardar);
            await state.modPet({
               name: nameInput,
               lugar: dataAGuardar["lugar"],
               img: dataAGuardar["dataUrl"],
               lat: dataAGuardar["lat"],
               lng: dataAGuardar["lng"],
            });

            alert("Modificado");
            Router.go("/myReport");
         });
      }
      function dataDropzone() {
         const myDropzone = initDropzone(".foto");
         myDropzone.on("thumbnail", function (file) {
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
      const pet = state.pets.find((item) => item.id === Number(state.idTemp));

      this.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <custom-barra></custom-barra>
      
      <div class="container pt-3">
         <h1>Editar reporte de mascota</h1>
         <form class="formulario">
            <div class="report__form">
               <div class="mb-3">
                  <label for="name" class="form-label">Nombre</label>
                  <input type="email" class="form-control name-input" id="name" value="${pet.name}">
               </div>
               <div class=" d-grid gap-2 col-6 mx-auto">   
                  <div class="foto btn btn-outline-primary">Subir Foto</div>
                  <div class="text-center">
                     <img src="${pet.img}" alt="${pet.name}"   class="imagen rounded img-fluid">
                  </div>      
               </div>
               <div class="report__form-mapbox">
                  <div class="mapbox-ubi" style='width: 100%; height: 250px;'></div>
                  <div class='search'></div>
               </div>
               <button type="button" class="enviar btn btn-success mt-3 mb-2">Reportar</button>
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
customElements.define("page-editreport", EditReport);
