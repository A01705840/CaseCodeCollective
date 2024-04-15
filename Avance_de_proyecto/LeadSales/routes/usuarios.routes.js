const express = require('express');
const router = express.Router();
const usuariosController= require('../controllers/usuarios.controller');

const isAuth = require('../util/isAuth');

router.get('/', usuariosController.get_login);

router.get('/login', usuariosController.get_login);

router.post('/login', usuariosController.post_login);

router.get('/signup', usuariosController.get_signup);

router.post('/signup', usuariosController.post_signup);

router.get('/logout', isAuth, usuariosController.get_logout);

module.exports = router;