const express = require('express');
const router = express.Router();
const biController = require('../controllers/biController');

router.get('/datasets', biController.getDatasets);
router.post('/datasets', biController.createDataset);
router.get('/queries', biController.getQueries);
router.post('/queries', biController.saveQuery);
router.get('/refresh', biController.refreshCache);

module.exports = router;
