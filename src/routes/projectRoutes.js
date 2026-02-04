const express = require('express');
const router = express.Router();
const pmController = require('../controllers/pmController'); // Reusing

router.get('/projects', pmController.getProjects);
router.get('/project-milestones', pmController.getProjectMilestones);
router.get('/project-risks', pmController.getProjectRisks);

module.exports = router;
