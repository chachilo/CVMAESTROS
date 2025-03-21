const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar las variables de entorno

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetEmail = (to, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Restauración de contraseña',
    html: `
      <p>Has solicitado restaurar tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
      <a href="http://localhost:3000/reset-password/${token}">Restablecer contraseña</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = { sendPasswordResetEmail };