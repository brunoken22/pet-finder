const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
mapboxgl.accessToken = MAPBOX_TOKEN;

const geocoder = new MapboxGeocoder({
   accessToken: mapboxgl.accessToken,
   countries: "ar",
   autocomplete: true,
   language: "es",
   placeholder: 'Ej: "Obelisco, Buenos Aires"',
   marker: false,
});

function initMapbox(mapElement) {
   return new mapboxgl.Map({
      container: mapElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-58.3873263, -34.6045776],
      zoom: 10,
      dragPan: true,
      // cooperativeGestures: true,
      scrollZoom: true,
   });
}

export { initMapbox, geocoder };
