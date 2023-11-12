const express = require("express")
const router = express.Router()
const User = require("../models/user.model")

router.get("/login", (req, res) => {
    res.render("login");
    res.redirect("/register")
  });

  router.get('/perfil', ensureAuthenticated, (req, res) => {
    // Tu lógica para manejar el perfil del usuario
    res.render('perfil', { user: req.user }); // Puedes acceder al usuario autenticado a través de req.user
  });

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const user = new User({ first_name, last_name, email, age, password })
        await user.save

        res.redirect("/login")

    } catch (error) {
        res.status(500).send("Error de registro")
    }
})

module.exports = router


