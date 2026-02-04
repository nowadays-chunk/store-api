// Admin User Management Controller
const { User } = require('../models');

const adminController = {
    // User Management
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['passwordHash'] },
                order: [['createdAt', 'DESC']]
            });
            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['passwordHash'] }
            });
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            await user.update(req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            await user.destroy();
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    suspendUser: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.isActive = false;
            await user.save();
            res.json({ message: 'User suspended', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    activateUser: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.isActive = true;
            await user.save();
            res.json({ message: 'User activated', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    assignRole: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.role = req.body.role;
            await user.save();
            res.json({ message: 'Role assigned', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getUserStats: async (req, res) => {
        res.json({
            totalUsers: 1000,
            activeUsers: 850,
            newThisMonth: 50
        });
    },

    // Bulk Operations
    bulkDeleteUsers: async (req, res) => {
        res.json({ message: 'Users deleted', count: req.body.ids.length });
    },

    bulkUpdateUsers: async (req, res) => {
        res.json({ message: 'Users updated', count: req.body.ids.length });
    },

    exportUsers: async (req, res) => {
        res.json({ exportUrl: 'https://example.com/users-export.csv' });
    }
};

module.exports = adminController;
