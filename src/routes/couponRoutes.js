const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.post('/', promotionController.createCoupon);
router.put('/:id', promotionController.updateCoupon);
router.delete('/:id', promotionController.deleteCoupon);
router.post('/validate', promotionController.validateCoupon);

module.exports = router;
