const express = require('express');

const router = express.Router();

const rolesController= require('../controllers/roles.controller');

router.get('/eliminar', isAuth, rolesController.get_mostrarRoles);
router.post('/eliminar', isAuth, rolesController.post_eliminar);

module.exports = router;
