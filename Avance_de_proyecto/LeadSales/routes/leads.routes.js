const express = require('express');

const router = express.Router();
const isAuth = require('../util/isAuth');
const canEdit = require('../util/canEdit');
const canViewRoles = require('../util/canViewRoles');
const canViewLeads = require('../util/canViewLeads');
const canViewHistorial = require('../util/canViewHistorial');
const canViewGraficas = require('../util/canViewGraficas');

const LeadsController = require('../controllers/leads.controller');
const VersionController = require('../controllers/version.controller');

router.get('/Analitica', isAuth, LeadsController.get_analitica);
router.get('/', isAuth, canViewRoles, canViewLeads, LeadsController.get_root);

router.get('/Historial', isAuth, canViewHistorial, VersionController.get_historial);
router.post('/Historial', isAuth, canViewHistorial, VersionController.post_historial);

router.get('/Leads', canViewLeads, isAuth, LeadsController.get_leads);
router.post('/Leads/eliminar', isAuth, canViewLeads, LeadsController.post_eliminar_lead);

router.get('/modificar/:id', isAuth, canViewLeads, LeadsController.get_modificar_lead);
router.post('/modificar', isAuth, canViewLeads, LeadsController.post_modificar_lead);

router.post('/Analitica', canViewGraficas, isAuth, LeadsController.postAnalitica);

module.exports = router;