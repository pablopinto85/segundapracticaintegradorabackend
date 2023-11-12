const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.logout(); // Cerrar sesión del usuario (función de Passport)
  req.flash('success_msg', '¡Has cerrado sesión correctamente!');
  res.redirect('/login'); // Redirigir al usuario a la página de inicio de sesión
});

module.exports = router;
