const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); // Reusing controller

router.get('/pricing', searchController.getDynamicPricing);
router.get('/fraud-score', searchController.getFraudScore);
router.get('/churn-prediction', searchController.getChurnPrediction);
router.get('/demand-forecast', searchController.getDemandForecast);

module.exports = router;
