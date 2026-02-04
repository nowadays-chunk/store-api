const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/', warehouseController.getAllWarehouses);
router.post('/', warehouseController.createWarehouse);
router.get('/:id', warehouseController.getWarehouseById);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);

// Stock & Operations
router.get('/:id/stock', warehouseController.getWarehouseStock);
router.post('/:id/stock-adjust', warehouseController.adjustWarehouseStock);
router.post('/:id/pack', warehouseController.packOrder);
router.post('/:id/ship', warehouseController.shipOrder);
router.get('/:id/metrics', warehouseController.getWarehouseMetrics);

// Picklists
router.get('/:id/picklists', warehouseController.getPickLists);
router.post('/:id/picklists', warehouseController.createPickList);
router.put('/:id/picklists/:pickId', warehouseController.updatePickList);

module.exports = router;
