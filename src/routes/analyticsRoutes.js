const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/sales', analyticsController.getSalesAnalytics);
router.get('/customers', analyticsController.getCustomerAnalytics);
router.get('/products', analyticsController.getProductAnalytics);
router.get('/conversion', analyticsController.getConversionAnalytics);
router.get('/traffic', analyticsController.getTrafficAnalytics);

module.exports = router;
