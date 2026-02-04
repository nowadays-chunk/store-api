const permissionService = require('../services/permissionService');

/**
 * Get all permissions
 */
exports.getAllPermissions = async (req, res, next) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.json({ permissions });
    } catch (error) {
        next(error);
    }
};

/**
 * Create permission
 */
exports.createPermission = async (req, res, next) => {
    try {
        const permission = await permissionService.createPermission(req.body);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update permission
 */
exports.updatePermission = async (req, res, next) => {
    try {
        const permission = await permissionService.updatePermission(req.params.id, req.body);
        res.json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete permission
 */
exports.deletePermission = async (req, res, next) => {
    try {
        const result = await permissionService.deletePermission(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Check permission
 */
exports.checkPermission = async (req, res, next) => {
    try {
        const { resource, action } = req.query;
        const hasPermission = await permissionService.checkPermission(req.user.id, resource, action);
        res.json({ hasPermission });
    } catch (error) {
        next(error);
    }
};

/**
 * Get permissions by role
 */
exports.getPermissionsByRole = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const permissions = await permissionService.getPermissionsByRole(roleId);
        res.json({ permissions });
    } catch (error) {
        next(error);
    }
};
