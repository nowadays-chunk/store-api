const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

// Apply protection to all order routes
router.use(protect);

// User Orders
router.get('/', orderController.listUserOrders); // Contextual list based on user
router.post('/', orderController.createOrder);

// User Orders
router.get('/', orderController.listUserOrders); // Contextual list based on user
router.post('/', orderController.createOrder);

// Order Details
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);
router.get('/:id/tracking', orderController.getTracking);
router.get('/:id/timeline', orderController.orderTimeline);

module.exports = router;
