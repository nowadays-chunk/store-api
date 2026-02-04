const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Global
router.get('/', workflowController.getAllWorkflows);
router.post('/', workflowController.createWorkflow);
router.post('/import', workflowController.importWorkflow);
router.get('/health', workflowController.getHealth);
router.get('/templates', workflowController.getTemplates);
router.post('/templates', workflowController.createTemplate);
router.delete('/templates/:id', workflowController.deleteTemplate);

// Per Workflow
router.get('/:id', workflowController.getWorkflowById);
router.put('/:id', workflowController.updateWorkflow);
router.delete('/:id', workflowController.deleteWorkflow);
router.put('/:id/publish', workflowController.publishWorkflow);
router.put('/:id/unpublish', workflowController.unpublishWorkflow);
router.post('/:id/clone', workflowController.cloneWorkflow);
router.post('/:id/export', workflowController.exportWorkflow);
router.post('/:id/test', workflowController.testWorkflow);
router.post('/:id/validate', workflowController.validateWorkflow);
router.get('/:id/history', workflowController.getHistory);
router.get('/:id/metrics', workflowController.getMetrics);
router.get('/:id/permissions', workflowController.getPermissions);
router.put('/:id/permissions', workflowController.updatePermissions);
router.post('/:id/bind/entity', workflowController.bindEntity);
router.post('/:id/bind/event', workflowController.bindEvent);
router.get('/:id/sla', workflowController.getSLA);
router.put('/:id/sla', workflowController.updateSLA);

// States
router.get('/:id/states', workflowController.getStates);
router.post('/:id/states', workflowController.createState);
router.put('/:id/states/:stateId', workflowController.updateState);
router.delete('/:id/states/:stateId', workflowController.deleteState);

// Transitions
router.get('/:id/transitions', workflowController.getTransitions);
router.post('/:id/transitions', workflowController.createTransition);
router.put('/:id/transitions/:transitionId', workflowController.updateTransition);
router.delete('/:id/transitions/:transitionId', workflowController.deleteTransition);

// Triggers
router.post('/:id/trigger/manual', workflowController.triggerManual);
router.post('/:id/trigger/event', workflowController.triggerEvent);
router.post('/:id/trigger/schedule', workflowController.triggerSchedule);

// Runs
router.get('/:id/runs', workflowController.getRuns);
router.get('/runs/:runId', workflowController.getRunDetails);
router.post('/runs/:runId/retry', workflowController.retryRun);
router.post('/runs/:runId/cancel', workflowController.cancelRun);
router.get('/runs/:runId/logs', workflowController.getRunLogs);

module.exports = router;
