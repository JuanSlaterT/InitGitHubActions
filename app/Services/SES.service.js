// mailer.js
const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Envía al administrador la solicitud para aprobar un nuevo usuario
 * (si desea rechazar, simplemente ignora el correo).
 */
async function sendApprovalRequestEmail({
  to,                // correo del admin
  adminName,         // nombre del admin
  newUserName,       // nombre del usuario a aprobar
  newUserEmail,      // correo del usuario a aprobar
  registrationDate,  // fecha de registro
  team,              // equipo o área propuesta
  requestedRole,     // rol solicitado
  ctaApproveUrl,     // enlace para aprobar
  currentYear,       // año actual
}) {
  const params = {
    Source: "IXComercio <noreply@ixcsvs.online>",
    Destination: { ToAddresses: [to] },
    Template: "email_aprobacion_template", // asegúrate de que el template exista en SES
    TemplateData: JSON.stringify({
      admin_name:        adminName,
      new_user_name:     newUserName,
      new_user_email:    newUserEmail,
      registration_date: registrationDate,
      team,
      requested_role:    requestedRole,
      cta_approve_url:   ctaApproveUrl,
      current_year:      currentYear,
    }),
  };

  return ses.send(new SendTemplatedEmailCommand(params));
}


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
      cta_url: ctaUrl || "Sin definir",
      current_year: currentYear,
    }),
  };

  const command = new SendTemplatedEmailCommand(params);
  return ses.send(command); // Devuelve un objeto con MessageId, etc.
}

module.exports = {
  sendRecognitionEmail,
  sendApprovalRequestEmail
};
