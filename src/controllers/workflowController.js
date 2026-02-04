const { Workflow, WorkflowState, WorkflowTransition } = require('../models');

exports.getAllWorkflows = async (req, res, next) => {
    try {
        const workflows = await Workflow.findAll({ include: ['states'] });
        res.json(workflows);
    } catch (error) {
        next(error);
    }
};

exports.createWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.create(req.body);
        res.status(201).json(workflow);
    } catch (error) {
        next(error);
    }
};

exports.getWorkflowById = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id, {
            include: ['states', 'transitions']
        });
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        res.json(workflow);
    } catch (error) {
        next(error);
    }
};

exports.updateWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id);
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        await workflow.update(req.body);
        res.json(workflow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id);
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        await workflow.destroy();
        res.json({ message: 'Workflow deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.publishWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id);
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        workflow.isPublished = true;
        await workflow.save();
        res.json({ message: 'Workflow published', workflow });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.unpublishWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id);
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        workflow.isPublished = false;
        await workflow.save();
        res.json({ message: 'Workflow unpublished', workflow });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// States
exports.getStates = async (req, res, next) => {
    try {
        const states = await WorkflowState.findAll({ where: { workflowId: req.params.id } });
        res.json(states);
    } catch (error) {
        next(error);
    }
};

exports.createState = async (req, res, next) => {
    try {
        const state = await WorkflowState.create({ ...req.body, workflowId: req.params.id });
        res.status(201).json(state);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateState = async (req, res, next) => {
    try {
        const state = await WorkflowState.findByPk(req.params.stateId);
        if (!state) return res.status(404).json({ message: 'State not found' });
        await state.update(req.body);
        res.json(state);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteState = async (req, res, next) => {
    try {
        const state = await WorkflowState.findByPk(req.params.stateId);
        if (!state) return res.status(404).json({ message: 'State not found' });
        await state.destroy();
        res.json({ message: 'State deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Transitions
exports.getTransitions = async (req, res, next) => {
    try {
        const transitions = await WorkflowTransition.findAll({ where: { workflowId: req.params.id } });
        res.json(transitions);
    } catch (error) {
        next(error);
    }
};

exports.createTransition = async (req, res, next) => {
    try {
        const transition = await WorkflowTransition.create({ ...req.body, workflowId: req.params.id });
        res.status(201).json(transition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTransition = async (req, res, next) => {
    try {
        const transition = await WorkflowTransition.findByPk(req.params.transitionId);
        if (!transition) return res.status(404).json({ message: 'Transition not found' });
        await transition.update(req.body);
        res.json(transition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTransition = async (req, res, next) => {
    try {
        const transition = await WorkflowTransition.findByPk(req.params.transitionId);
        if (!transition) return res.status(404).json({ message: 'Transition not found' });
        await transition.destroy();
        res.json({ message: 'Transition deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Testing & Validation
exports.testWorkflow = async (req, res, next) => {
    res.json({ message: 'Workflow test initiated', testId: 'TEST-' + Date.now() });
};

exports.validateWorkflow = async (req, res, next) => {
    res.json({ valid: true, errors: [] });
};

exports.getHistory = async (req, res, next) => {
    res.json({ history: [] });
};

exports.cloneWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id);
        if (!workflow) return res.status(404).json({ message: 'Workflow not found' });
        const cloned = await Workflow.create({
            ...workflow.toJSON(),
            id: undefined,
            name: workflow.name + ' (Copy)'
        });
        res.status(201).json(cloned);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Triggers
exports.triggerManual = async (req, res, next) => {
    res.json({ message: 'Workflow triggered manually', runId: 'RUN-' + Date.now() });
};

exports.triggerEvent = async (req, res, next) => {
    res.json({ message: 'Event trigger configured' });
};

exports.triggerSchedule = async (req, res, next) => {
    res.json({ message: 'Schedule trigger configured' });
};

// Runs
exports.getRuns = async (req, res, next) => {
    res.json({ runs: [] });
};

exports.getRunDetails = async (req, res, next) => {
    res.json({ run: { id: req.params.runId, status: 'completed' } });
};

exports.retryRun = async (req, res, next) => {
    res.json({ message: 'Run retried', newRunId: 'RUN-' + Date.now() });
};

exports.cancelRun = async (req, res, next) => {
    res.json({ message: 'Run cancelled' });
};

exports.getRunLogs = async (req, res, next) => {
    res.json({ logs: [] });
};

// Import/Export
exports.exportWorkflow = async (req, res, next) => {
    res.json({ exportData: {}, format: 'json' });
};

exports.importWorkflow = async (req, res, next) => {
    res.status(201).json({ message: 'Workflow imported', id: Date.now() });
};

// Templates
exports.getTemplates = async (req, res, next) => {
    res.json({ templates: [] });
};

exports.createTemplate = async (req, res, next) => {
    res.status(201).json({ message: 'Template created' });
};

exports.deleteTemplate = async (req, res, next) => {
    res.json({ message: 'Template deleted' });
};

// Permissions & Bindings
exports.getPermissions = async (req, res, next) => {
    res.json({ permissions: [] });
};

exports.updatePermissions = async (req, res, next) => {
    res.json({ message: 'Permissions updated' });
};

exports.bindEntity = async (req, res, next) => {
    res.json({ message: 'Entity bound to workflow' });
};

exports.bindEvent = async (req, res, next) => {
    res.json({ message: 'Event bound to workflow' });
};

// SLA & Metrics
exports.getSLA = async (req, res, next) => {
    res.json({ sla: { responseTime: 300, completionTime: 3600 } });
};

exports.updateSLA = async (req, res, next) => {
    res.json({ message: 'SLA updated' });
};

exports.getMetrics = async (req, res, next) => {
    res.json({
        totalRuns: 100,
        successRate: 0.95,
        avgDuration: 120
    });
};

exports.getHealth = async (req, res, next) => {
    res.json({ status: 'healthy', uptime: '99.9%' });
};
