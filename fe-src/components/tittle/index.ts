class Title extends HTMLElement {
   connectedCallback() {
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const h1 = document.createElement("h1");
      const contenedor = this.getAttribute("description");
      h1.innerHTML = contenedor;
      h1.style.textAlign = "center";
      h1.style.margin = "0";
      shadow.appendChild(h1);
   }
}
customElements.define("custom-title", Title);
