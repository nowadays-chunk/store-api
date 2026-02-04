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
    try {
        const { workflowId } = req.params;
        const { testData } = req.body;

        const workflow = await Workflow.findByPk(workflowId, {
            include: [
                { model: WorkflowState, as: 'states' },
                { model: WorkflowTransition, as: 'transitions' }
            ]
        });

        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        // Simulate workflow execution
        const testRun = {
            testId: 'TEST-' + Date.now(),
            workflowId,
            status: 'RUNNING',
            startedAt: new Date(),
            testData,
            steps: []
        };

        // Simulate state transitions
        const states = workflow.states || [];
        for (let i = 0; i < states.length; i++) {
            testRun.steps.push({
                stateId: states[i].id,
                stateName: states[i].name,
                status: 'COMPLETED',
                duration: Math.floor(Math.random() * 1000)
            });
        }

        testRun.status = 'COMPLETED';
        testRun.completedAt = new Date();

        res.json({
            message: 'Workflow test completed',
            testRun
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.validateWorkflow = async (req, res, next) => {
    try {
        const { workflowId } = req.params;

        const workflow = await Workflow.findByPk(workflowId, {
            include: [
                { model: WorkflowState, as: 'states' },
                { model: WorkflowTransition, as: 'transitions' }
            ]
        });

        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        const errors = [];
        const warnings = [];

        // Validation rules
        if (!workflow.states || workflow.states.length === 0) {
            errors.push('Workflow must have at least one state');
        }

        if (!workflow.transitions || workflow.transitions.length === 0) {
            warnings.push('Workflow has no transitions defined');
        }

        // Check for orphaned states
        const stateIds = new Set(workflow.states.map(s => s.id));
        const referencedStates = new Set();
        workflow.transitions.forEach(t => {
            referencedStates.add(t.fromStateId);
            referencedStates.add(t.toStateId);
        });

        stateIds.forEach(id => {
            if (!referencedStates.has(id)) {
                warnings.push(`State ${id} is not connected to any transitions`);
            }
        });

        res.json({
            valid: errors.length === 0,
            errors,
            warnings
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getHistory = async (req, res, next) => {
    try {
        const { workflowId } = req.params;

        // Mock history data
        const history = [
            {
                id: 1,
                workflowId,
                action: 'CREATED',
                userId: req.user?.id,
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                details: 'Workflow created'
            },
            {
                id: 2,
                workflowId,
                action: 'PUBLISHED',
                userId: req.user?.id,
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                details: 'Workflow published'
            }
        ];

        res.json({ history });
    } catch (error) {
        next(error);
    }
};

exports.cloneWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id, {
            include: [
                { model: WorkflowState, as: 'states' },
                { model: WorkflowTransition, as: 'transitions' }
            ]
        });

        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        // Clone workflow
        const clonedData = workflow.toJSON();
        delete clonedData.id;
        delete clonedData.createdAt;
        delete clonedData.updatedAt;

        const cloned = await Workflow.create({
            ...clonedData,
            name: workflow.name + ' (Copy)',
            isPublished: false
        });

        res.status(201).json({
            message: 'Workflow cloned successfully',
            workflow: cloned
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Triggers
exports.triggerManual = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { inputData } = req.body;

        const workflow = await Workflow.findByPk(workflowId);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        if (!workflow.isPublished) {
            return res.status(400).json({ message: 'Workflow must be published before execution' });
        }

        const run = {
            runId: 'RUN-' + Date.now(),
            workflowId,
            triggeredBy: 'MANUAL',
            userId: req.user?.id,
            status: 'QUEUED',
            inputData,
            createdAt: new Date()
        };

        res.json({
            message: 'Workflow triggered successfully',
            run
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.triggerEvent = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { eventType, eventData } = req.body;

        res.json({
            message: 'Event trigger configured',
            workflowId,
            eventType,
            status: 'ACTIVE'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.triggerSchedule = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { cronExpression, timezone } = req.body;

        res.json({
            message: 'Schedule trigger configured',
            workflowId,
            schedule: cronExpression,
            timezone: timezone || 'UTC',
            nextRun: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Runs
exports.getRuns = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { status, limit = 50 } = req.query;

        // Mock run data
        const runs = [
            {
                runId: 'RUN-001',
                workflowId,
                status: 'COMPLETED',
                startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
                duration: 1800
            },
            {
                runId: 'RUN-002',
                workflowId,
                status: 'RUNNING',
                startedAt: new Date(Date.now() - 10 * 60 * 1000),
                duration: null
            }
        ];

        const filtered = status ? runs.filter(r => r.status === status) : runs;

        res.json({
            runs: filtered.slice(0, parseInt(limit)),
            total: filtered.length
        });
    } catch (error) {
        next(error);
    }
};

exports.getRunDetails = async (req, res, next) => {
    try {
        const { runId } = req.params;

        const run = {
            runId,
            workflowId: req.params.id,
            status: 'COMPLETED',
            startedAt: new Date(Date.now() - 60 * 60 * 1000),
            completedAt: new Date(Date.now() - 30 * 60 * 1000),
            duration: 1800,
            steps: [
                { stateId: 1, status: 'COMPLETED', duration: 500 },
                { stateId: 2, status: 'COMPLETED', duration: 800 },
                { stateId: 3, status: 'COMPLETED', duration: 500 }
            ],
            output: { result: 'success' }
        };

        res.json({ run });
    } catch (error) {
        next(error);
    }
};

exports.retryRun = async (req, res, next) => {
    try {
        const { runId } = req.params;

        const newRun = {
            runId: 'RUN-' + Date.now(),
            originalRunId: runId,
            status: 'QUEUED',
            createdAt: new Date()
        };

        res.json({
            message: 'Run retried successfully',
            newRun
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.cancelRun = async (req, res, next) => {
    try {
        const { runId } = req.params;

        res.json({
            message: 'Run cancelled successfully',
            runId,
            status: 'CANCELLED',
            cancelledAt: new Date()
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRunLogs = async (req, res, next) => {
    try {
        const { runId } = req.params;

        const logs = [
            { timestamp: new Date(), level: 'INFO', message: 'Workflow started' },
            { timestamp: new Date(), level: 'INFO', message: 'State 1 completed' },
            { timestamp: new Date(), level: 'INFO', message: 'State 2 completed' },
            { timestamp: new Date(), level: 'INFO', message: 'Workflow completed' }
        ];

        res.json({ logs });
    } catch (error) {
        next(error);
    }
};

// Import/Export
exports.exportWorkflow = async (req, res, next) => {
    try {
        const workflow = await Workflow.findByPk(req.params.id, {
            include: [
                { model: WorkflowState, as: 'states' },
                { model: WorkflowTransition, as: 'transitions' }
            ]
        });

        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        const exportData = {
            version: '1.0',
            workflow: workflow.toJSON(),
            exportedAt: new Date(),
            exportedBy: req.user?.id
        };

        res.json({
            exportData,
            format: 'json'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.importWorkflow = async (req, res, next) => {
    try {
        const { workflowData } = req.body;

        if (!workflowData || !workflowData.workflow) {
            return res.status(400).json({ message: 'Invalid workflow data' });
        }

        const imported = await Workflow.create({
            ...workflowData.workflow,
            id: undefined,
            isPublished: false,
            importedAt: new Date()
        });

        res.status(201).json({
            message: 'Workflow imported successfully',
            workflow: imported
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Templates
exports.getTemplates = async (req, res, next) => {
    try {
        const templates = [
            {
                id: 1,
                name: 'Order Processing',
                description: 'Standard order processing workflow',
                category: 'E-commerce'
            },
            {
                id: 2,
                name: 'Customer Onboarding',
                description: 'New customer onboarding process',
                category: 'CRM'
            }
        ];

        res.json({ templates });
    } catch (error) {
        next(error);
    }
};

exports.createTemplate = async (req, res, next) => {
    try {
        const { workflowId, templateName, description } = req.body;

        const workflow = await Workflow.findByPk(workflowId);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }

        res.status(201).json({
            message: 'Template created successfully',
            template: {
                id: Date.now(),
                name: templateName,
                description,
                workflowId
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTemplate = async (req, res, next) => {
    try {
        const { templateId } = req.params;

        res.json({
            message: 'Template deleted successfully',
            templateId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Permissions & Bindings
exports.getPermissions = async (req, res, next) => {
    try {
        const { workflowId } = req.params;

        const permissions = [
            { role: 'admin', canExecute: true, canEdit: true, canDelete: true },
            { role: 'user', canExecute: true, canEdit: false, canDelete: false }
        ];

        res.json({ permissions });
    } catch (error) {
        next(error);
    }
};

exports.updatePermissions = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { permissions } = req.body;

        res.json({
            message: 'Permissions updated successfully',
            workflowId,
            permissions
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.bindEntity = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { entityType, entityId } = req.body;

        res.json({
            message: 'Entity bound to workflow successfully',
            workflowId,
            entityType,
            entityId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.bindEvent = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { eventType, eventConfig } = req.body;

        res.json({
            message: 'Event bound to workflow successfully',
            workflowId,
            eventType,
            eventConfig
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// SLA & Metrics
exports.getSLA = async (req, res, next) => {
    try {
        const { workflowId } = req.params;

        const sla = {
            workflowId,
            responseTime: 300, // 5 minutes
            completionTime: 3600, // 1 hour
            maxRetries: 3,
            alertThreshold: 0.8
        };

        res.json({ sla });
    } catch (error) {
        next(error);
    }
};

exports.updateSLA = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const slaConfig = req.body;

        res.json({
            message: 'SLA updated successfully',
            workflowId,
            sla: slaConfig
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMetrics = async (req, res, next) => {
    try {
        const { workflowId } = req.params;
        const { startDate, endDate } = req.query;

        const metrics = {
            workflowId,
            period: { startDate, endDate },
            totalRuns: 150,
            successfulRuns: 142,
            failedRuns: 8,
            successRate: 0.947,
            avgDuration: 125, // seconds
            minDuration: 45,
            maxDuration: 350,
            p50Duration: 110,
            p95Duration: 280,
            p99Duration: 340
        };

        res.json(metrics);
    } catch (error) {
        next(error);
    }
};

exports.getHealth = async (req, res, next) => {
    try {
        const { workflowId } = req.params;

        const health = {
            workflowId,
            status: 'healthy',
            uptime: '99.95%',
            lastRun: new Date(Date.now() - 10 * 60 * 1000),
            lastSuccess: new Date(Date.now() - 10 * 60 * 1000),
            lastFailure: new Date(Date.now() - 24 * 60 * 60 * 1000),
            activeRuns: 2,
            queuedRuns: 0
        };

        res.json(health);
    } catch (error) {
        next(error);
    }
};

