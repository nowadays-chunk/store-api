const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketingController');

router.get('/campaigns', marketingController.getCampaigns);
router.get('/campaigns/:id', marketingController.getCampaignDetails);
router.get('/segments', marketingController.getSegments);
router.get('/ab-tests', marketingController.getABTests);
router.get('/ab-tests/:id/results', marketingController.getABTestResults);
router.get('/referrals', marketingController.getReferrals);
router.get('/loyalty', marketingController.getLoyaltyProgram);
router.get('/loyalty/points', marketingController.getLoyaltyPoints);
router.get('/gift-cards', marketingController.getGiftCards);
router.get('/gift-cards/:code', marketingController.lookupGiftCard);

module.exports = router;
