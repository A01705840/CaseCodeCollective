const express = require('express');

const router = express.Router();

const LeadsController = require('../controllers/leads.controller');

router.get('/Analitica', LeadsController.get_analitica);
router.get('/', LeadsController.get_root);

module.exports = router;