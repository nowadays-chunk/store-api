const { Notification } = require('../models');

const notificationController = {
    getNotifications: async (req, res, next) => {
        try {
            const notifications = await Notification.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'DESC']],
                limit: 50
            });
            res.json(notifications);
        } catch (error) {
            next(error);
        }
    },

    markAsRead: async (req, res, next) => {
        try {
            const notification = await Notification.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!notification) return res.status(404).json({ message: 'Notification not found' });
            notification.isRead = true;
            notification.readAt = new Date();
            await notification.save();
            res.json(notification);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    markAllAsRead: async (req, res, next) => {
        try {
            await Notification.update(
                { isRead: true, readAt: new Date() },
                { where: { userId: req.user.id, isRead: false } }
            );
            res.json({ message: 'All notifications marked as read' });
        } catch (error) {
            next(error);
        }
    },

    deleteNotification: async (req, res, next) => {
        try {
            await Notification.destroy({
                where: { id: req.params.id, userId: req.user.id }
            });
            res.json({ message: 'Notification deleted' });
        } catch (error) {
            next(error);
        }
    },

    getUnreadCount: async (req, res, next) => {
        try {
            const count = await Notification.count({
                where: { userId: req.user.id, isRead: false }
            });
            res.json({ count });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = notificationController;
