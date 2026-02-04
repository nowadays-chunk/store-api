const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const { protect, restrictTo } = require('../../middleware/auth');

// All routes here require admin access
router.use(protect, restrictTo('admin'));

// Admin List & Stats
router.get('/all', orderController.adminListAll);
router.get('/stats', orderController.adminOrderStats);
router.get('/queue', orderController.adminFulfillmentQueue);

// Order Operations
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/tracking', orderController.updateTracking);
router.post('/:id/notes', orderController.addAdminNote);
router.get('/:id/notes', orderController.getAdminNotes);

// Advanced Operations
router.post('/:id/split', orderController.splitOrder);
router.post('/:id/merge', orderController.mergeOrders);
router.post('/:id/reprocess', orderController.reprocessOrder);
router.post('/:id/manual', orderController.manualOrder);
router.post('/:id/adjustment', orderController.manualAdjustment);
router.post('/:id/writeoff', orderController.writeOffOrder);

module.exports = router;
