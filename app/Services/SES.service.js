// mailer.js
const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function sendRecognitionEmail({
  to,
  userName,
  certType,
  userRole,
  issueDate,
  expiryDate,
  ctaUrl,
  currentYear,
}) {
  const params = {
    Source: "Reconocimientos IXComercio <reconocimientos@ixcsvs.online>",
    Destination: { ToAddresses: [to] },
    Template: "email_reconocimiento_template",
    TemplateData: JSON.stringify({
      user_name: userName,
      cert_type: certType,
      user_role: userRole,
      issue_date: issueDate,
      expiry_date: expiryDate || "Sin definir",
      cta_url: ctaUrl ||"Sin definir",
      current_year: currentYear,
    }),
  };

  const command = new SendTemplatedEmailCommand(params);
  return ses.send(command); // Devuelve un objeto con MessageId, etc.
}

module.exports = {
  sendRecognitionEmail
};
