const { Permission, Role, sequelize } = require('../models');

class PermissionService {
    /**
     * Get all permissions
     */
    async getAllPermissions() {
        const permissions = await Permission.findAll({
            order: [['resource', 'ASC'], ['action', 'ASC']]
        });
        return permissions;
    }

    /**
     * Create permission
     */
    async createPermission(permissionData) {
        const permission = await Permission.create(permissionData);
        return permission;
    }

    /**
     * Update permission
     */
    async updatePermission(permissionId, updates) {
        const permission = await Permission.findByPk(permissionId);
        if (!permission) throw new Error('Permission not found');

        await permission.update(updates);
        return permission;
    }

    /**
     * Delete permission
     */
    async deletePermission(permissionId) {
        const permission = await Permission.findByPk(permissionId);
        if (!permission) throw new Error('Permission not found');

        await permission.destroy();
        return { message: 'Permission deleted' };
    }

    /**
     * Check if user has permission
     */
    async checkPermission(userId, resource, action) {
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                as: 'roles',
                include: [{
                    model: Permission,
                    as: 'permissions'
                }]
            }]
        });

        if (!user) return false;

        // Check if user has the permission through any role
        for (const role of user.roles || []) {
            const hasPermission = role.permissions?.some(p =>
                p.resource === resource && p.action === action
            );
            if (hasPermission) return true;
        }

        return false;
    }

    /**
     * Get permissions by role
     */
    async getPermissionsByRole(roleId) {
        const role = await Role.findByPk(roleId, {
            include: [{ model: Permission, as: 'permissions' }]
        });

        if (!role) throw new Error('Role not found');
        return role.permissions || [];
    }
}

module.exports = new PermissionService();
