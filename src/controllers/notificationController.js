const notificationService = require('../services/notificationService');

/**
 * Get user notifications
 */
exports.getNotifications = async (req, res, next) => {
    try {
        const result = await notificationService.getUserNotifications(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Mark notification as read
 */
exports.markAsRead = async (req, res, next) => {
    try {
        const notification = await notificationService.markAsRead(req.params.id);
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Mark all as read
 */
exports.markAllAsRead = async (req, res, next) => {
    try {
        const result = await notificationService.markAllAsRead(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete notification
 */
exports.deleteNotification = async (req, res, next) => {
    try {
        const result = await notificationService.deleteNotification(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get unread count
 */
exports.getUnreadCount = async (req, res, next) => {
    try {
        const result = await notificationService.getUnreadCount(req.user.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Send push notification (admin)
 */
exports.sendPush = async (req, res, next) => {
    try {
        const { userId, message } = req.body;
        const result = await notificationService.sendPushNotification(userId, message);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Broadcast notification (admin)
 */
exports.broadcast = async (req, res, next) => {
    try {
        const result = await notificationService.broadcastNotification(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
