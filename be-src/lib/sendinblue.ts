import axios from "axios";
import generateMail from "./mail";

// Configura tus credenciales y detalles del correo electrónico
export async function sendinblue(data) {
  const apiKey = process.env.SENDINBLUE;
  const senderEmail = "bruno.am.59@gmail.com";
  const recipientEmail = data.nombreRecib;
  const subject = `${data.namePet} fue visto/a`;
  const content = generateMail(data.info, data.tel, data.nombre, data.email, data.namePet);

  const send = {
    sender: { email: senderEmail, name: recipientEmail },
    to: [{ email: data.email, name: data.nombre }],
    subject: subject,
    htmlContent: content,
  };

  const responseBrevo = await axios.post("https://api.brevo.com/v3/smtp/email", send, {
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
  });
  return responseBrevo.data;
}
