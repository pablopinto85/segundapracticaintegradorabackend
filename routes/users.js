// users.js (routes/users.js)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el correo electrónico ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        res.status(500).send('Error durante el registro');
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Correo electrónico o contraseña incorrectos');
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Correo electrónico o contraseña incorrectos');
        }

        // Usuario autenticado, puedes generar el token JWT y manejar la sesión aquí

        res.status(200).send('Inicio de sesión exitoso');
    } catch (error) {
        res.status(500).send('Error durante el inicio de sesión');
    }
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    // Destruir la sesión aquí si estás utilizando sesiones
    req.logout(); // Para Passport.js
    res.status(200).send('Cierre de sesión exitoso');
});

module.exports = router;
