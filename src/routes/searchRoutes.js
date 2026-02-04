const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search Config
router.get('/suggestions', searchController.getSuggestions);
router.get('/synonyms', searchController.getSynonyms);
router.get('/boosting', searchController.getBoostingRules);

// Recommendations (Mounted under /api/recommendations in app.js or handled here?)
// If I mount it at /api/search, these paths are /api/search/recommendations...
// The spec says /api/recommendations/home.
// I will split routes if needed or mount multiple times.
// Let's create `recommendationRoutes.js` and `aiRoutes.js` separately for clarity in app.js mount points.
// Actually, I'll stick to one controller but separate route files if easy, or one route file.
// I'll create `searchRoutes.js` for /api/search.
module.exports = router;
