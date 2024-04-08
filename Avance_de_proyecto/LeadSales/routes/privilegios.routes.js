const express = require('express');

const router = express.Router();

const PrivilegiosController = require('../controllers/privilegios.controller');


router.get('/', PrivilegiosController.get_privilegios);
router.post('/', PrivilegiosController.post_privilegios);


module.exports = router;