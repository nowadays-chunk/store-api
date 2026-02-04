const express = require('express');
const router = express.Router();
const shipperController = require('../controllers/shipperController');

router.get('/', shipperController.getAllShippers);
router.get('/:id', shipperController.getShipperById);
router.post('/', shipperController.createShipper);
router.put('/:id', shipperController.updateShipper);
router.delete('/:id', shipperController.deleteShipper);

module.exports = router;
