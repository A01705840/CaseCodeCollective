const express = require('express');

const router = express.Router();

const PrivilegiosController = require('../controllers/privilegios.controller');


router.get('/', PrivilegiosController.get_privilegios);



module.exports = router;