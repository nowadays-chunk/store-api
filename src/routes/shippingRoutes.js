const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/carriers', shippingController.getCarriers);
router.get('/rates', shippingController.getRates);
router.post('/labels', shippingController.createLabel);
router.get('/labels/:id', shippingController.getLabel);
router.post('/pickup', shippingController.schedulePickup);

module.exports = router;
