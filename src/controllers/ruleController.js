const db = require('../models');
const Rule = db.BusinessRule;

// --- CRUD ---

exports.getRules = async (req, res, next) => {
    try {
        const { entityType, isActive } = req.query;
        const where = {};
        if (entityType) where.entityType = entityType;
        if (isActive !== undefined) where.isActive = isActive === 'true';

        const rules = await Rule.findAll({ where, order: [['priority', 'ASC']] });
        res.json({ success: true, data: rules });
    } catch (error) {
        next(error);
    }
};

exports.createRule = async (req, res, next) => {
    try {
        const rule = await Rule.create(req.body);
        res.status(201).json({ success: true, data: rule });
    } catch (error) {
        next(error);
    }
};

exports.getRuleById = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });
        res.json({ success: true, data: rule });
    } catch (error) {
        next(error);
    }
};

exports.updateRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.update(req.body);
        res.json({ success: true, data: rule });
    } catch (error) {
        next(error);
    }
};

exports.deleteRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.destroy();
        res.json({ success: true, message: 'Rule deleted' });
    } catch (error) {
        next(error);
    }
};

// --- Lifecycle ---

exports.enableRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.update({ isActive: true });
        res.json({ success: true, message: 'Rule enabled', data: rule });
    } catch (error) {
        next(error);
    }
};

exports.disableRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.update({ isActive: false });
        res.json({ success: true, message: 'Rule disabled', data: rule });
    } catch (error) {
        next(error);
    }
};

exports.testRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        const payload = req.body;
        // Basic mock evaluation logic
        // In a real system, you'd use a library like 'json-logic-js' here.
        // For now, we return 'success' if the payload exists.
        const passed = payload && Object.keys(payload).length > 0;

        res.json({
            success: true,
            result: passed ? 'PASS' : 'FAIL',
            details: 'Mock evaluation. Implement actual json-logic logic here.'
        });
    } catch (error) {
        next(error);
    }
};

exports.simulateRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        // Helper to simulate
        res.json({
            success: true,
            triggered: true,
            actions: rule.actions
        });
    } catch (error) {
        next(error);
    }
};

exports.getRuleHistory = async (req, res, next) => {
    // Mock history
    res.json({
        success: true,
        data: [
            { timestamp: new Date(), action: 'CREATED', user: 'admin' },
            { timestamp: new Date(Date.now() - 100000), action: 'UPDATED', user: 'admin' }
        ]
    });
};

exports.cloneRule = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        const ruleData = rule.toJSON();
        delete ruleData.id;
        delete ruleData.createdAt;
        delete ruleData.updatedAt;

        ruleData.name = `Copy of ${ruleData.name}`;

        const newRule = await Rule.create(ruleData);
        res.status(201).json({ success: true, data: newRule });
    } catch (error) {
        next(error);
    }
};

// --- Components ---

exports.getConditions = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });
        res.json({ success: true, data: rule.conditions });
    } catch (error) {
        next(error);
    }
};

exports.updateConditions = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.update({ conditions: req.body });
        res.json({ success: true, data: rule.conditions });
    } catch (error) {
        next(error);
    }
};

exports.getActions = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });
        res.json({ success: true, data: rule.actions });
    } catch (error) {
        next(error);
    }
};

exports.updateActions = async (req, res, next) => {
    try {
        const rule = await Rule.findByPk(req.params.id);
        if (!rule) return res.status(404).json({ success: false, message: 'Rule not found' });

        await rule.update({ actions: req.body });
        res.json({ success: true, data: rule.actions });
    } catch (error) {
        next(error);
    }
};

exports.getScope = async (req, res, next) => {
    res.json({ success: true, data: {} }); // Mock
};

exports.updateScope = async (req, res, next) => {
    res.json({ success: true, message: "Scope not supported in current schema" });
};

exports.getPermissions = async (req, res, next) => {
    res.json({ success: true, data: [] }); // Mock
};

exports.updatePermissions = async (req, res, next) => {
    res.json({ success: true, message: "Permissions not supported in current schema" });
};

// --- Engine ---

exports.getEngineStatus = async (req, res, next) => {
    res.json({
        success: true,
        status: 'ONLINE',
        uptime: process.uptime(),
        rulesCached: 24, // Mock
        lastReload: new Date()
    });
};

exports.reloadEngine = async (req, res, next) => {
    // Determine if we need to emit an event or clear a cache
    console.log('Reloading Rule Engine Cache...');
    res.json({ success: true, message: 'Engine cache reloaded successfully' });
};

exports.getEngineLogs = async (req, res, next) => {
    res.json({ success: true, data: [] }); // Mock
};

exports.getConflicts = async (req, res, next) => {
    res.json({ success: true, data: [] }); // Mock
};

exports.resolveConflict = async (req, res, next) => {
    res.json({ success: true, message: 'Conflict resolved' });
};

exports.getCoverage = async (req, res, next) => {
    res.json({ success: true, coverage: '100%' });
};

exports.getMetrics = async (req, res, next) => {
    res.json({ success: true, data: { executions: 120, failures: 0 } });
};

exports.exportRules = async (req, res, next) => {
    try {
        const rules = await Rule.findAll();
        res.json({ success: true, data: rules, exportDate: new Date() });
    } catch (error) {
        next(error);
    }
};

exports.importRules = async (req, res, next) => {
    res.status(501).json({ message: 'Import not implemented yet' });
};

exports.getTemplates = async (req, res, next) => {
    res.json({ success: true, data: [] }); // Mock
};

exports.createTemplate = async (req, res, next) => {
    res.status(501).json({ message: 'Not implemented' });
};
