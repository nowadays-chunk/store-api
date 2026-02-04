const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/complianceController'); // Reusing compliance controller

router.get('/terms-versions', complianceController.getTermsVersions);
router.get('/privacy-versions', complianceController.getPrivacyVersions);
router.get('/acceptances', complianceController.getLegalAcceptances);
router.get('/disputes', complianceController.getLegalDisputes);

module.exports = router;
