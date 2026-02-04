const express = require('express');
const router = express.Router();
const omniController = require('../controllers/omniController'); // Reusing

router.get('/', omniController.getStores);
router.get('/:id/inventory', omniController.getStoreInventory);
router.get('/:id/pickup', omniController.getStorePickup);
router.get('/:id/returns', omniController.getStoreReturns);

module.exports = router;
