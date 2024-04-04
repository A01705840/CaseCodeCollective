const express = require('express');
const router = express.Router();
const usuariosController= require('../controllers/usuarios.controller');


router.get('/login', usuariosController.get_login);

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;