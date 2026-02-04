const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.put('/items/:id', cartController.updateItem);
router.delete('/items/:id', cartController.removeItem);
router.post('/apply-coupon', cartController.applyCoupon);
router.delete('/remove-coupon', cartController.removeCoupon);
router.post('/estimate-shipping', cartController.estimateShipping);
router.post('/validate', cartController.validateCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
