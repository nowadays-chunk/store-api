const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController'); // Reusing

router.get('/imports', integrationController.getETLImports);
router.get('/exports', integrationController.getETLExports);

module.exports = router;
