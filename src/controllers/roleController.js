const roleService = require('../services/roleService');

/**
 * Get all roles
 */
exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json({ roles });
    } catch (error) {
        next(error);
    }
};

/**
 * Create role
 */
exports.createRole = async (req, res, next) => {
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update role
 */
exports.updateRole = async (req, res, next) => {
    try {
        const role = await roleService.updateRole(req.params.id, req.body);
        res.json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete role
 */
exports.deleteRole = async (req, res, next) => {
    try {
        const result = await roleService.deleteRole(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Assign permissions to role
 */
exports.assignPermissions = async (req, res, next) => {
    try {
        const { permissionIds } = req.body;
        const role = await roleService.assignPermissions(req.params.id, permissionIds);
        res.json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get users by role
 */
exports.getUsersByRole = async (req, res, next) => {
    try {
        const users = await roleService.getUsersByRole(req.params.id);
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

// Auto-generated stub functions
exports.listRoles = async (req, res, next) => {
    try {
        res.json({ message: 'listRoles endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.removePermission = async (req, res, next) => {
    try {
        res.json({ message: 'removePermission endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

