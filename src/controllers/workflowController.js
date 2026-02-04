const { Workflow, WorkflowState } = require('../models');

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

exports.getWorkflowById = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updateWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.deleteWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.publishWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.unpublishWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getStates = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.createState = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updateState = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.deleteState = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getTransitions = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.createTransition = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updateTransition = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.deleteTransition = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.testWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.validateWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getHistory = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.cloneWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.triggerManual = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.triggerEvent = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.triggerSchedule = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getRuns = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getRunDetails = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.retryRun = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.cancelRun = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getRunLogs = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.exportWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.importWorkflow = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getTemplates = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.createTemplate = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.deleteTemplate = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getPermissions = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updatePermissions = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.bindEntity = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.bindEvent = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getSLA = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updateSLA = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getMetrics = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getHealth = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
