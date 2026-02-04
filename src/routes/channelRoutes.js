const express = require('express');
const router = express.Router();
const omniController = require('../controllers/omniController'); // Reusing

router.get('/', omniController.getChannels);
router.get('/:id', omniController.getChannelConfig);

module.exports = router;
