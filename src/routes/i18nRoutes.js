const express = require('express');
const router = express.Router();
const omniController = require('../controllers/omniController');

router.get('/locales', omniController.getLocales);
router.get('/translations', omniController.getTranslations);

module.exports = router;
