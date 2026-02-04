const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/complianceController');

router.get('/gdpr/requests', complianceController.getGDPRRequests);
router.get('/consents', complianceController.getConsents);
router.get('/retention-policies', complianceController.getRetentionPolicies);
router.get('/audit-trails', complianceController.getAuditTrails);
router.get('/export-controls', complianceController.getExportControls);
router.get('/sanctions-screening', complianceController.getSanctionsScreening);

module.exports = router;
