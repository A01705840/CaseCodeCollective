const express = require('express');

const router = express.Router();

const LeadsController = require('../controllers/leads.controller');
const VersionController = require('../controllers/version.controller');

router.get('/Analitica', LeadsController.get_analitica);
router.get('/', LeadsController.get_root);
router.get('/Historial', VersionController.get_historial);
router.get('/Leads', LeadsController.get_leads);


module.exports = router;