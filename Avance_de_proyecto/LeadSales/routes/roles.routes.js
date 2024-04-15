const express = require('express');

const router = express.Router();

const rolesController= require('../controllers/roles.controller');

const isAuth = require('../util/isAuth');

router.get('/consultas', isAuth, rolesController.get_mostrarRoles);
router.post('/eliminar', isAuth,  rolesController.post_eliminar);
router.get('/agregar', isAuth, rolesController.get_agregarRol);
router.post('/agregar', isAuth, rolesController.post_agregarRol);
router.get('/equipo', isAuth, rolesController.get_equipo);
router.post('/cambiarRol', isAuth, rolesController.post_cambiarRol);
router.get('/buscar/:q', isAuth, rolesController.get_buscar);
router.get('/buscar', isAuth, rolesController.get_buscar);

module.exports = router;
