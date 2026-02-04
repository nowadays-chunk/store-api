const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// User Orders
router.get('/', orderController.listUserOrders); // Contextual list based on user
router.post('/', orderController.createOrder);

// Admin List & Stats (Specific paths before :id)
router.get('/admin/all', orderController.adminListAll);
router.get('/admin/stats', orderController.adminOrderStats);
router.get('/admin/queue', orderController.adminFulfillmentQueue);

// Order Details & Operations (Dynamic ID)
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus); // Existing
router.put('/:id/cancel', orderController.cancelOrder);
router.put('/:id/return', orderController.returnOrder);
router.put('/:id/exchange', orderController.exchangeOrder);
router.put('/:id/hold', orderController.holdOrder);
router.put('/:id/release', orderController.releaseHold);

// Logistics & Tracking
router.get('/:id/shipments', orderController.getOrderShipments);
router.put('/:id/tracking', orderController.updateTracking);
router.get('/:id/tracking', orderController.getTracking);
router.post('/:id/reship', orderController.reshipOrder);

// Documents & Notes
router.get('/:id/invoice', orderController.downloadInvoice);
router.post('/:id/notes', orderController.addAdminNote);
router.get('/:id/notes', orderController.getAdminNotes);
router.post('/:id/resend-confirmation', orderController.resendConfirmation);
router.get('/:id/timeline', orderController.orderTimeline);

// Advanced Operations
router.post('/:id/split', orderController.splitOrder);
router.post('/:id/merge', orderController.mergeOrders); // This technically might need multiple IDs? Route says /:id/merge, maybe merge THIS order into another? Or merge others INTO this one.
router.post('/:id/reprocess', orderController.reprocessOrder);
router.post('/:id/manual', orderController.manualOrder);
router.post('/:id/adjustment', orderController.manualAdjustment);
router.post('/:id/writeoff', orderController.writeOffOrder);

module.exports = router;
