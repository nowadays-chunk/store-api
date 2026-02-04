const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/process', paymentController.processPayment);
router.get('/history', paymentController.getPaymentHistory); // Before /:id
router.get('/:id', paymentController.getPaymentStatus);
router.post('/refund', paymentController.refundPayment);
router.post('/capture', paymentController.capturePayment);
router.post('/void', paymentController.voidPayment);
router.post('/webhook/stripe', paymentController.stripeWebhook);

module.exports = router;
