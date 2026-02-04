const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Static Routes first
router.get('/', inventoryController.getInventory);
router.get('/warehouses', inventoryController.getWarehouses); // Legacy placement
router.get('/history', inventoryController.getInventoryHistory);
router.get('/reservations', inventoryController.getStockReservations);
router.get('/forecast', inventoryController.getForecast);
router.get('/reorder', inventoryController.getReorderSuggestions);
router.get('/aging', inventoryController.getStockAging);
router.get('/shrinkage', inventoryController.getShrinkageReport);
router.get('/count/history', inventoryController.getStockCountHistory);

// Operations
router.post('/adjust', inventoryController.adjustStock); // Generic adjust
router.post('/transfer', inventoryController.transferStock);
router.post('/reserve', inventoryController.reserveStock);
router.post('/release', inventoryController.releaseStock);
router.post('/reorder', inventoryController.createReorder);

// Stock Counting
router.post('/count/start', inventoryController.startStockCount);
router.post('/count/submit', inventoryController.submitStockCount);

// Variant Specific (Dynamic :variantId matches anything not matched above)
router.get('/:variantId', inventoryController.getVariantInventory);
router.put('/:variantId/lock', inventoryController.lockStock);
router.put('/:variantId/unlock', inventoryController.unlockStock);

module.exports = router;
