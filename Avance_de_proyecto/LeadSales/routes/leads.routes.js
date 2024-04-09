const express = require('express');

const router = express.Router();
const isAuth = require('../util/isAuth');
const canEdit = require('../util/canEdit');

const LeadsController = require('../controllers/leads.controller');
const VersionController = require('../controllers/version.controller');

router.get('/Analitica', LeadsController.get_analitica);
router.get('/', LeadsController.get_root);

router.get('/Historial', VersionController.get_historial);
router.post('/Historial', VersionController.post_historial);

router.get('/Leads', LeadsController.get_leads);
router.post('/Leads/eliminar', LeadsController.post_eliminar_lead);


module.exports = router;