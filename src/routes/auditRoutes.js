const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

router.get('/logs', auditController.getGlobalAudit);
router.get('/logs/export', auditController.exportAudit);
router.get('/entities/:entity', auditController.getEntityAudit);
router.get('/users/:id', auditController.getUserAudit);
router.get('/changes', auditController.getChangeHistory);
router.post('/annotations', auditController.annotateAudit);
router.get('/retention', auditController.getRetentionPolicy);
router.put('/retention', auditController.updateRetentionPolicy);
router.post('/archive', auditController.archiveAudit);
router.post('/purge', auditController.purgeAudit);
router.get('/integrity', auditController.checkIntegrity);

module.exports = router;
