
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github'));
router.get('/githubcallback', passport.authenticate('github', {
    successRedirect: '/perfil',
    failureRedirect: '/login'
}));

router.post('/login', passport.authenticate('local', {
    successRedirect: '/perfil',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;

