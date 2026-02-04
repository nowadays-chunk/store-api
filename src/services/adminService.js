const { User, Role, Permission, sequelize } = require('../models');

class AdminService {
    /**
     * Get all users with pagination and filters
     */
    async getAllUsers(filters = {}) {
        const { page = 1, limit = 20, search, role, status } = filters;
        const offset = (page - 1) * limit;

        const where = {};
        if (search) {
            where[sequelize.Op.or] = [
                { email: { [sequelize.Op.like]: `%${search}%` } },
                { firstName: { [sequelize.Op.like]: `%${search}%` } },
                { lastName: { [sequelize.Op.like]: `%${search}%` } }
            ];
        }
        if (role) where.role = role;
        if (status !== undefined) where.isActive = status === 'active';

        const { rows: users, count } = await User.findAndCountAll({
            where,
            attributes: { exclude: ['passwordHash'] },
            include: [{ model: Role, as: 'roles' }],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            users,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Suspend user account
     */
    async suspendUser(userId, reason) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        user.isActive = false;
        user.suspensionReason = reason;
        user.suspendedAt = new Date();
        await user.save();

        return user;
    }

    /**
     * Activate user account
     */
    async activateUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        user.isActive = true;
        user.suspensionReason = null;
        user.suspendedAt = null;
        await user.save();

        return user;
    }

    /**
     * Bulk import users
     */
    async bulkImportUsers(usersData) {
        const t = await sequelize.transaction();
        const results = { success: 0, failed: 0, errors: [] };

        try {
            for (const userData of usersData) {
                try {
                    await User.create(userData, { transaction: t });
                    results.success++;
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        email: userData.email,
                        error: error.message
                    });
                }
            }

            await t.commit();
            return results;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Bulk export users
     */
    async bulkExportUsers(filters = {}) {
        const users = await User.findAll({
            where: filters,
            attributes: { exclude: ['passwordHash'] }
        });

        return users.map(user => user.toJSON());
    }

    /**
     * Get user activity log
     */
    async getUserActivity(userId, limit = 50) {
        // In real app, query activity log table
        return {
            userId,
            activities: []
        };
    }

    /**
     * Reset user password (admin)
     */
    async resetUserPassword(userId, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const bcrypt = require('bcryptjs');
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        user.passwordResetRequired = true;
        await user.save();

        return { message: 'Password reset successfully' };
    }

    /**
     * Assign role to user
     */
    async assignRole(userId, roleId) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');

        await user.addRole(role);
        return user;
    }

    /**
     * Remove role from user
     */
    async removeRole(userId, roleId) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        await user.removeRole(roleId);
        return user;
    }
}

module.exports = new AdminService();
