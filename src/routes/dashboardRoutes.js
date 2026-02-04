const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getDashboards);
router.post('/', dashboardController.createDashboard);
router.get('/:id', dashboardController.getDashboardById);
router.put('/:id', dashboardController.updateDashboard);
router.delete('/:id', dashboardController.deleteDashboard);
router.post('/:id/widgets', dashboardController.addWidget);
router.put('/:id/widgets/:widgetId', dashboardController.updateWidget);
router.delete('/:id/widgets/:widgetId', dashboardController.deleteWidget);
router.get('/:id/permissions', dashboardController.getPermissions);
router.put('/:id/permissions', dashboardController.updatePermissions);
router.post('/:id/clone', dashboardController.cloneDashboard);

module.exports = router;
