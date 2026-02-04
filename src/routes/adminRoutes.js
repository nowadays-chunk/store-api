const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platformController');

router.get('/feature-flags', platformController.getFeatureFlags);
router.put('/feature-flags/:id', platformController.updateFeatureFlag);
router.get('/config', platformController.getPlatformConfig);
router.get('/env', platformController.getEnvironmentInfo);
router.get('/jobs', platformController.getBackgroundJobs);
router.post('/jobs/:id/retry', platformController.retryJob);
router.get('/health', platformController.getHealthCheck);
router.get('/metrics', platformController.getSystemMetrics);
router.get('/rate-limits', platformController.getRateLimitConfig);
router.get('/maintenance', platformController.getMaintenanceMode);

module.exports = router;
