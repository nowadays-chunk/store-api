const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController'); // Reusing controller

router.get('/logs', recordController.getGlobalAudit);
router.get('/logs/export', recordController.exportAudit);
router.get('/entities/:entity', recordController.getEntityAudit);
router.get('/users/:id', recordController.getUserAudit);
router.get('/changes', recordController.getChangeHistory);
router.post('/annotations', recordController.annotateAudit);
router.get('/retention', recordController.getRetentionPolicy);
router.put('/retention', recordController.updateRetentionPolicy);
router.post('/archive', recordController.archiveAudit);
router.post('/purge', recordController.purgeAudit);
router.get('/integrity', recordController.checkIntegrity);

module.exports = router;
