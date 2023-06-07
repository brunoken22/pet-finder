const axios = require("axios");

// Configura tus credenciales y detalles del correo electrónico
export function sendinblue(data) {
   const apiKey =
      "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";
   const senderEmail = "bruno.am.59@gmail.com";
   const recipientEmail = data.nombreRecib;
   const subject = `${data.namePet} fue visto/a`;
   const content = `<html><body><h2>${data.info}</h2><br><a href="tel:${data.tel}">LLamar : ${data.tel}</a></body></html>`;

   // Define el cuerpo de la solicitud
   const send = {
      sender: { email: senderEmail, name: recipientEmail },
      to: [{ email: data.email, name: data.nombre }],
      subject: subject,
      htmlContent: content,
   };

   // Realiza la solicitud POST para enviar el correo electrónico
   axios
      .post("https://api.sendinblue.com/v3/smtp/email", send, {
         headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
         },
      })
      .then((response) => {
         console.log("Correo electrónico enviado:");
      })
      .catch((error) => {
         console.error("Error al enviar el correo electrónico:", error);
      });
}
