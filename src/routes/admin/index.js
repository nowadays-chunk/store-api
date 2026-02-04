const express = require('express');
const router = express.Router();

// Import Admin Sub-Routers
const productAdminRoutes = require('./productAdminRoutes');
const orderAdminRoutes = require('./orderAdminRoutes');
const inventoryRoutes = require('../inventoryRoutes');
const warehouseRoutes = require('../warehouseRoutes');
const shipperRoutes = require('../shipperRoutes');
const roleRoutes = require('../roleRoutes');
const permissionController = require('../../controllers/permissionController');
const analyticsRoutes = require('../analyticsRoutes');
const webhookRoutes = require('../webhookRoutes');
const integrationRoutes = require('../integrationRoutes');
const etlRoutes = require('../etlRoutes');
const workflowRoutes = require('../workflowRoutes');
const ruleRoutes = require('../ruleRoutes');
const auditRoutes = require('../auditRoutes');
const biRoutes = require('../biRoutes');
const dashboardRoutes = require('../dashboardRoutes');
const entityRoutes = require('../entityRoutes');
const adminRoutes = require('../adminRoutes'); // Platform config

// Admin Sub-routes
router.use('/products', productAdminRoutes);
router.use('/orders', orderAdminRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/shippers', shipperRoutes);
router.use('/roles', roleRoutes);
router.get('/permissions', permissionController.getAllPermissions);
router.use('/analytics', analyticsRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/integrations', integrationRoutes);
router.use('/etl', etlRoutes);
router.use('/workflows', workflowRoutes);
router.use('/rules', ruleRoutes);
router.use('/audit', auditRoutes);
router.use('/bi', biRoutes);
router.use('/dashboards', dashboardRoutes);
router.use('/entities', entityRoutes);
router.use('/platform', adminRoutes);

// Aliases for root-level admin health checks (requested by frontend/user)
router.get('/health', (req, res, next) => {
    // Forward to platform health check
    req.url = '/platform/health';
    router.handle(req, res, next);
});

router.get('/config', (req, res, next) => {
    // Forward to platform config
    req.url = '/platform/config';
    router.handle(req, res, next);
});

module.exports = router;
