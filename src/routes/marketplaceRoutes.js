const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

router.get('/vendors', marketplaceController.getAllVendors);
router.post('/vendors/register', marketplaceController.registerVendor);
router.put('/vendors/:id/approve', marketplaceController.approveVendor);

module.exports = router;
