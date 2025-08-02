const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
  const msg = {
    to: to,
    from: {
      email: 'noreply@ixcsvs.online',
      name: 'IXComercio'
    },
    templateId: "d-a9a06727f3834ea28fb61c9ac9392b7d", 
    dynamicTemplateData: {
      admin_name: adminName,
      new_user_name: newUserName,
      new_user_email: newUserEmail,
      registration_date: registrationDate,
      team: team,
      requested_role: requestedRole,
      cta_approve_url: ctaApproveUrl,
      current_year: currentYear,
    },
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error('Error sending approval request email:', error);
    throw error;
  }
}

/**
 * Envía email de reconocimiento al usuario
 */
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
  const msg = {
    to: to,
    from: {
      email: 'reconocimientos@ixcsvs.online',
      name: 'Reconocimientos IXComercio'
    },
    templateId: "d-096424c7566443f09785653d09e84bab", // Template ID para reconocimientos
    dynamicTemplateData: {
      user_name: userName,
      cert_type: certType,
      user_role: userRole,
      issue_date: issueDate,
      expiry_date: expiryDate || "Sin definir",
      cta_url: ctaUrl || "Sin definir",
      current_year: currentYear,
    },
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error('Error sending recognition email:', error);
    throw error;
  }
}

/**
 * Función genérica para enviar emails usando SendGrid
 */
async function sendEmail({
  to,
  from,
  subject,
  text,
  html,
  templateId,
  dynamicTemplateData,
  attachments
}) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
    templateId: templateId,
    dynamicTemplateData: dynamicTemplateData,
    attachments: attachments
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Función para enviar emails múltiples usando SendGrid
 */
async function sendMultipleEmails(emails) {
  try {
    const response = await sgMail.sendMultiple(emails);
    return response;
  } catch (error) {
    console.error('Error sending multiple emails:', error);
    throw error;
  }
}

module.exports = {
  sendRecognitionEmail,
  sendApprovalRequestEmail,
  sendEmail,
  sendMultipleEmails
};