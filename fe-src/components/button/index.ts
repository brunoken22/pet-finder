class Boton extends HTMLElement {
   connectedCallback() {
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const button = document.createElement("button");
      const contenedor = this.getAttribute("description");
      const estilo = this.getAttribute("style");
      button.classList.add("button");
      button.classList.add(estilo);
      button.textContent = contenedor;
      const style = document.createElement("style");
      style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";  
   
      `;
      shadow.appendChild(style);
      shadow.appendChild(button);
   }
}
customElements.define("custom-button", Boton);
