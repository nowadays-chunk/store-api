const express = require('express');
const router = express.Router();
const omniController = require('../controllers/omniController'); // Reusing

router.get('/zones', omniController.getPricingZones);

module.exports = router;
