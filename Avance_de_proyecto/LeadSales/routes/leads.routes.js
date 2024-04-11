const express = require('express');

const router = express.Router();

const LeadsController = require('../controllers/leads.controller');
const VersionController = require('../controllers/version.controller');

router.get('/', LeadsController.get_root);


router.get('/Analitica', LeadsController.get_analitica);
router.post('/Analitica', LeadsController.postAnalitica);

router.get('/Historial', VersionController.get_historial);
router.post('/Historial', VersionController.post_historial);

router.get('/Leads', LeadsController.get_leads);
router.post('/eliminar/', LeadsController.post_eliminar_lead);

module.exports = router;
