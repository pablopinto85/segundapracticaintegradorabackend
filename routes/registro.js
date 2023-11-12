const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.model'); // Asegúrate de tener la ruta correcta a tu modelo de usuario

const router = express.Router();

router.get('/registro', (req, res) => {
  res.render('registro'); // Renderiza el formulario de registro (debes tener un archivo de vista llamado 'registro')
});

router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.flash('error_msg', 'El correo electrónico ya está registrado.');
      return res.redirect('/registro');
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ nombre, email, password: hashedPassword });
    await newUser.save();

    req.flash('success_msg', '¡Registro exitoso! Ahora puedes iniciar sesión.');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error durante el registro. Por favor, inténtalo de nuevo.');
    res.redirect('/registro');
  }
});

module.exports = router;
