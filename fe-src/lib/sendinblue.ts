const SibApiV3Sdk = require("sib-api-v3-typescript");

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.SENDINBLUE;

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export { sendSmtpEmail, apiInstance };
