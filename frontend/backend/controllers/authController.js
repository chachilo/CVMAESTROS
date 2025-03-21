const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { sendPasswordResetEmail } = require('../service/emailService'); // Importar el servicio de correo electrónico


// Verificar que las variables de entorno se están cargando correctamente
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Registro
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña manualmente antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    console.log('Comparando contraseñas para el usuario:', user.email); // Log seguro
    const isMatch = await bcrypt.compare(password, user.password); // Usar bcrypt
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error al iniciar sesión', details: err.message });
  }
};

// Recuperación de contraseña
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validación básica
  if (!email) {
    return res.status(400).json({ error: 'El correo electrónico es obligatorio' });
  }

  try {
    // Buscar el usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Generar el token de restablecimiento
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // Configurar el correo electrónico
    const mailOptions = {
      to: user.email,
      subject: 'Recuperación de contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/reset-password/${token}`,
    };

    // Log para verificar que se está intentando enviar el correo
    console.log('Enviando correo a:', user.email);

    await transporter.sendMail(mailOptions);

    // Log para verificar que el correo se envió correctamente
    console.log('Correo de recuperación enviado a:', user.email);

    res.json({ message: 'Correo de recuperación enviado' });
  } catch (err) {
    console.error('Error al procesar la solicitud:', err);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Validación básica
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar el usuario con el token válido
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Usar bcrypt
    
    // Actualizar la contraseña y limpiar el token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (err) {
    console.error('Error al restablecer la contraseña:', err);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};

// Obtener los datos del usuario actual
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del usuario', error });
  }
};