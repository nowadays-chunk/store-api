const { Role, Permission, User, sequelize } = require('../models');

class RoleService {
    /**
     * Get all roles
     */
    async getAllRoles() {
        const roles = await Role.findAll({
            include: [{ model: Permission, as: 'permissions' }]
        });
        return roles;
    }

    /**
     * Create role
     */
    async createRole(roleData) {
        const role = await Role.create(roleData);
        return role;
    }

    /**
     * Update role
     */
    async updateRole(roleId, updates) {
        const role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');

        await role.update(updates);
        return role;
    }

    /**
     * Delete role
     */
    async deleteRole(roleId) {
        const role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');

        // Check if role is assigned to users
        const userCount = await User.count({
            include: [{
                model: Role,
                as: 'roles',
                where: { id: roleId }
            }]
        });

        if (userCount > 0) {
            throw new Error(`Cannot delete role assigned to ${userCount} users`);
        }

        await role.destroy();
        return { message: 'Role deleted' };
    }

    /**
     * Assign permissions to role
     */
    async assignPermissions(roleId, permissionIds) {
        const role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');

        await role.setPermissions(permissionIds);

        const updatedRole = await Role.findByPk(roleId, {
            include: [{ model: Permission, as: 'permissions' }]
        });

        return updatedRole;
    }

    /**
     * Get users with role
     */
    async getUsersByRole(roleId) {
        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'roles',
                where: { id: roleId }
            }],
            attributes: { exclude: ['passwordHash'] }
        });

        return users;
    }
}

module.exports = new RoleService();
