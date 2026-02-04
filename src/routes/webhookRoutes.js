const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/inventory', analyticsController.inventoryWebhook);

module.exports = router;
