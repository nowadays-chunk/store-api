const express = require('express');
const router = express.Router();
const pmController = require('../controllers/pmController');

router.get('/tasks', pmController.getTasks);
router.get('/task-comments', pmController.getTaskComments);
router.get('/task-dependencies', pmController.getTaskDependencies);

module.exports = router;
