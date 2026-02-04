const express = require('express');
const router = express.Router(); // This file might need split mounting or just handle one?
// I'll handle /promotions here. Coupons logic depends on mount point.
const promotionController = require('../controllers/promotionController');

router.get('/', promotionController.listPromotions);
router.post('/', promotionController.createPromotion);
router.put('/:id', promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;
