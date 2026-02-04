const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/start', checkoutController.startCheckout);
router.post('/shipping-method', checkoutController.selectShipping);
router.post('/payment-intent', checkoutController.createPaymentIntent);
router.post('/confirm', checkoutController.confirmCheckout);

module.exports = router;
