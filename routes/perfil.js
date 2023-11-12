const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Ruta protegida del perfil del usuario
router.get('/', ensureAuthenticated, (req, res) => {
    console.log("Registro correcto");
    res.send('Bienvenido a tu perfil');
});

module.exports = router;
