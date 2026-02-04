const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search & Suggestions
router.get('/', searchController.advancedSearch);
router.get('/suggestions', searchController.getSuggestions); // or getSearchSuggestions
router.get('/trending', searchController.getTrendingSearches);

// Search Configuration
router.get('/synonyms', searchController.getSynonyms);
router.get('/boosting', searchController.getBoostingRules);

// Saved Searches
router.post('/save', searchController.saveSearch);
router.get('/saved', searchController.getSavedSearches);
router.delete('/saved/:id', searchController.deleteSavedSearch);

// Analytics
router.get('/analytics', searchController.getSearchAnalytics);
router.post('/track', searchController.trackSearch);

module.exports = router;
