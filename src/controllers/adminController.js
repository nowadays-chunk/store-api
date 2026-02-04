const adminService = require('../services/adminService');

/**
 * Get all users
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsers(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Suspend user
 */
exports.suspendUser = async (req, res, next) => {
    try {
        const { reason } = req.body;
        const user = await adminService.suspendUser(req.params.id, reason);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Activate user
 */
exports.activateUser = async (req, res, next) => {
    try {
        const user = await adminService.activateUser(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Bulk import users
 */
exports.bulkImport = async (req, res, next) => {
    try {
        const { users } = req.body;
        const result = await adminService.bulkImportUsers(users);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Bulk export users
 */
exports.bulkExport = async (req, res, next) => {
    try {
        const users = await adminService.bulkExportUsers(req.query);
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user activity
 */
exports.getUserActivity = async (req, res, next) => {
    try {
        const activity = await adminService.getUserActivity(req.params.id);
        res.json(activity);
    } catch (error) {
        next(error);
    }
};

/**
 * Reset user password
 */
exports.resetUserPassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const result = await adminService.resetUserPassword(req.params.id, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Assign role to user
 */
exports.assignRole = async (req, res, next) => {
    try {
        const { roleId } = req.body;
        const user = await adminService.assignRole(req.params.id, roleId);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Remove role from user
 */
exports.removeRole = async (req, res, next) => {
    try {
        const { roleId } = req.body;
        const user = await adminService.removeRole(req.params.id, roleId);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete user
 */
exports.deleteUser = async (req, res, next) => {
    try {
        await adminService.deleteUser(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
