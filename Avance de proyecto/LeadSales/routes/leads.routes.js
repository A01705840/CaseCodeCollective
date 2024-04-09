const express = require('express');

const router = express.Router();

const LeadsController = require('../controllers/leads.controller');

router.get('/Analitica', LeadsController.get_analitica);
router.get('/Leads', LeadsController.get_leads);
router.get('/', LeadsController.get_root);
router.get('/Historial', LeadsController.get_historial);

module.exports = router;