const express = require('express');
const router = express.Router();
const usuariosController= require('../controllers/usuarios.controller');

const isAuth = require('../util/isAuth');


router.get('/login', usuariosController.get_login);

router.get('/signup', isAuth, usuariosController.get_signup);

router.post('/signup', isAuth, usuariosController.post_signup);

module.exports = router;