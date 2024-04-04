const express = require('express');
const router = express.Router();
const usuariosController= require('../controllers/usuarios.controller');


router.get('/login', usuariosController.get_login);

module.exports = router;