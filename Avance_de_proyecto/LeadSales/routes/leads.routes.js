const express = require('express');

const router = express.Router();
const isAuth = require('../util/isAuth');
const canEdit = require('../util/canEdit');
const canEliminarLeads = require('../util/canEliminarLeads');

const LeadsController = require('../controllers/leads.controller');
const VersionController = require('../controllers/version.controller');

router.get('/Analitica', isAuth, LeadsController.get_analitica);
router.get('/', isAuth, LeadsController.get_root);

router.get('/Historial', isAuth, VersionController.get_historial);
router.post('/Historial', isAuth, VersionController.post_historial);

router.get('/Leads', isAuth, LeadsController.get_leads);
router.post('/eliminar', isAuth, canEliminarLeads, LeadsController.post_eliminar_lead);

router.post('/Analitica', isAuth, LeadsController.postAnalitica);

module.exports = router;