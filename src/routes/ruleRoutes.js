const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Engine (Static Paths First)
router.get('/engine/status', ruleController.getEngineStatus);
router.post('/engine/reload', ruleController.reloadEngine);
router.get('/engine/logs', ruleController.getEngineLogs);
router.get('/engine/conflicts', ruleController.getConflicts);

// Ops
router.get('/coverage', ruleController.getCoverage);
router.get('/metrics', ruleController.getMetrics);
router.post('/export', ruleController.exportRules);
router.post('/import', ruleController.importRules);
router.get('/templates', ruleController.getTemplates);
router.post('/templates', ruleController.createTemplate);
router.post('/resolve-conflict', ruleController.resolveConflict);

// Rules (Generic :id Paths Last)
router.get('/', ruleController.getRules);
router.post('/', ruleController.createRule);
router.get('/:id', ruleController.getRuleById);
router.put('/:id', ruleController.updateRule);
router.delete('/:id', ruleController.deleteRule);

// Lifecycle
router.put('/:id/enable', ruleController.enableRule);
router.put('/:id/disable', ruleController.disableRule);
router.post('/:id/test', ruleController.testRule);
router.post('/:id/simulate', ruleController.simulateRule);
router.get('/:id/history', ruleController.getRuleHistory);
router.post('/:id/clone', ruleController.cloneRule);

// Components
router.get('/:id/conditions', ruleController.getConditions);
router.put('/:id/conditions', ruleController.updateConditions);
router.get('/:id/actions', ruleController.getActions);
router.put('/:id/actions', ruleController.updateActions);
router.get('/:id/scope', ruleController.getScope);
router.put('/:id/scope', ruleController.updateScope);
router.get('/:id/permissions', ruleController.getPermissions);
router.put('/:id/permissions', ruleController.updatePermissions);

module.exports = router;
