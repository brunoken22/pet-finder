class For extends HTMLElement {
   connectedCallback() {
      this.render();
   }
   render() {
      const shadow = this.attachShadow({ mode: "open" });
      const button = document.createElement("form");
      button.classList.add("form");
      button.classList.add("container-sm");

      button.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Email address</label>
         <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
         </div>
         <div class="mb-3">
         <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
         <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
         </div>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      `;

      shadow.appendChild(button);
   }
}
customElements.define("custom-formu", For);
