const express = require('express');
const router = express.Router();
const pmController = require('../controllers/pmController'); // Reusing

router.get('/policies', pmController.getSLAPolicies);
router.get('/breaches', pmController.getSLABreaches);

module.exports = router;
