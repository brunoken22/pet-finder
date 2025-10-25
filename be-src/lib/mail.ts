export default function generateMail(
  info: string,
  tel: string,
  nombre: string,
  email: string,
  namePet: string
) {
  return `
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center"
    >
      <tbody>
        <tr>
          <td
            style="
              background-color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
                Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
            "
          >
            <div
              style="
                display: none;
                overflow: hidden;
                line-height: 1px;
                opacity: 0;
                max-height: 0;
                max-width: 0;
              "
              data-skip-in-text="true"
            >
              Fue visto - ${namePet}
            </div>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width: 100%; margin: 0 auto; padding: 20px 0 48px; width: 580px"
            >
              <tbody>
                <tr style="width: 100%">
                  <td>

                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="Mascota"
                              height="96"
                              src="https://pet-finder-angular.netlify.app/logo.webp"
                              style="
                                display: block;
                                outline: none;
                                border: none;
                                text-decoration: none;
                                margin: 0 auto;
                                margin-bottom: 16px;
                                border-radius: 50%;
                              "
                              width="96"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding-bottom: 20px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tbody style="width: 100%">
                                <tr style="width: 100%">
                                  <p
                                    style="
                                      font-size: 32px;
                                      line-height: 1.3;
                                      font-weight: 700;
                                      color: #484848;
                                      margin-top: 16px;
                                      margin-bottom: 16px;
                                    "
                                  >
                                    Nueva solicitud para ${namePet}
                                  </p>
                                  <p
                                    style="
                                      font-size: 18px;
                                      line-height: 1.4;
                                      color: #484848;
                                      padding: 24px;
                                      background-color: #f2f3f3;
                                      border-radius: 4px;
                                      margin-top: 16px;
                                      margin-bottom: 16px;
                                    "
                                  >
                                    "${info}"
                                  </p>
                                  <p
                                    style="
                                      font-size: 18px;
                                      line-height: 1.4;
                                      color: #484848;
                                      margin-top: 16px;
                                      margin-bottom: 16px;
                                    "
                                  >
                                    <strong>Información de contacto:</strong><br/>
                                    Nombre: ${nombre}<br/>
                                    Teléfono: ${tel}
                                  </p>
                                  <p
                                    style="
                                      font-size: 18px;
                                      line-height: 1.4;
                                      color: #484848;
                                      padding-bottom: 16px;
                                      margin-top: 16px;
                                      margin-bottom: 16px;
                                    "
                                  >
                                    Por favor, contacta al interesado lo antes posible para coordinar los detalles.
                                  </p>
                                  <a
                                    href="tel:${tel}"
                                    style="
                                      line-height: 100%;
                                      text-decoration: none;
                                      display: block;
                                      max-width: 100%;
                                      mso-padding-alt: 0px;
                                      background-color: #ff5a5f;
                                      border-radius: 3px;
                                      color: #fff;
                                      font-size: 18px;
                                      padding: 19px 30px;
                                      text-align: center;
                                      padding-top: 19px;
                                      padding-right: 30px;
                                      padding-bottom: 19px;
                                      padding-left: 30px;
                                    "
                                    target="_blank"
                                    ><span
                                      ><!--[if mso
                                        ]><i
                                          style="mso-font-width: 500%; mso-text-raise: 28.5"
                                          hidden
                                          >&#8202;&#8202;&#8202;</i
                                        ><!
                                      [endif]--></span
                                    ><span
                                      style="
                                        max-width: 100%;
                                        display: inline-block;
                                        line-height: 120%;
                                        mso-padding-alt: 0px;
                                        mso-text-raise: 14.25px;
                                      "
                                      >Llamar a ${nombre}</span
                                    ><span
                                      ><!--[if mso
                                        ]><i style="mso-font-width: 500%" hidden
                                          >&#8202;&#8202;&#8202;&#8203;</i
                                        ><!
                                      [endif]--></span
                                    ></a
                                  >
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="
                        width: 100%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                        border-color: #cccccc;
                        margin: 20px 0;
                      "
                    />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tbody style="width: 100%">
                                <tr style="width: 100%">
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 24px;
                                      color: #9ca299;
                                      margin-bottom: 10px;
                                      margin-top: 16px;
                                    "
                                  >
                                    Este es un mensaje automático, por favor no responder directamente a este email.
                                  </p>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

 `;
}
