const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.get('/:id', vendorController.getVendorById);
router.post('/', vendorController.createVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);

// Marketplace/Vendor Specifics
router.get('/:id/products', vendorController.getVendorProducts);
router.get('/:id/payouts', vendorController.getVendorPayouts);
router.get('/:id/settlements', vendorController.getVendorSettlements);
router.get('/:id/kyc', vendorController.getVendorKYC);
router.get('/:id/ratings', vendorController.getVendorRatings);
router.get('/:id/disputes', vendorController.getVendorDisputes);

module.exports = router;
