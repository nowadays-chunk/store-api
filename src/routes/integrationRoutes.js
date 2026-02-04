const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');

router.get('/', integrationController.getIntegrations);
router.get('/:id', integrationController.getIntegrationConfig);
router.post('/sync/run', integrationController.runSync);
router.get('/sync/status', integrationController.getSyncStatus);
router.get('/mappings', integrationController.getMappings);

module.exports = router;
