const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // Lógica para registrar usuarios
  // Redirigir a la vista de productos después del registro
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
 if (user.role === 'admin') {
    req.session.isAdmin = true;
  } else {
    req.session.isAdmin = false;
  }
});

router.get('/products', (req, res) => {
  // Verificar el rol del usuario y mostrar datos según el rol
  // Renderizar la vista de productos con mensaje de bienvenida
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;

