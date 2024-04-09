const express = require('express');
const router = express.Router();
const usuariosController= require('../controllers/usuarios.controller');


router.post('/eliminarRol', usuariosController.post_signup);

module.exports = router;