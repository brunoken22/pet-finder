import axios from 'axios';

// Configura tus credenciales y detalles del correo electrónico
export async function sendinblue(data) {
  const apiKey = process.env.SENDINBLUE;
  const senderEmail = 'bruno.am.59@gmail.com';
  const recipientEmail = data.nombreRecib;
  const subject = `${data.namePet} fue visto/a`;
  const content = `<html><body><h2>${data.info}</h2><br><a href="tel:${data.tel}">LLamar : ${data.tel}</a></body></html>`;

  // Define el cuerpo de la solicitud
  const send = {
    sender: {email: senderEmail, name: recipientEmail},
    to: [{email: data.email, name: data.nombre}],
    subject: subject,
    htmlContent: content,
  };

  return await axios
    .post('https://api.brevo.com/v3/smtp/email', send, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Correo electrónico enviado:', response.status);
      return response.data;
    })
    .catch((error) => {
      console.error('Error al enviar el correo electrónico:', error);
      return error;
    });
}
