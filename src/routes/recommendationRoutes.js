const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); // Reusing controller

router.get('/home', searchController.getRecommendations);
router.get('/cart', searchController.getCartRecommendations);
router.get('/user/:id', searchController.getUserRecommendations);

module.exports = router;
