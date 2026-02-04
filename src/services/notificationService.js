const { Notification, User, sequelize } = require('../models');

class NotificationService {
    /**
     * Create notification
     */
    async createNotification(userId, notificationData) {
        const notification = await Notification.create({
            userId,
            ...notificationData
        });
        return notification;
    }

    /**
     * Get user notifications
     */
    async getUserNotifications(userId, filters = {}) {
        const { page = 1, limit = 20, unreadOnly = false } = filters;
        const offset = (page - 1) * limit;

        const where = { userId };
        if (unreadOnly) where.isRead = false;

        const { rows: notifications, count } = await Notification.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            notifications,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId) {
        const notification = await Notification.findByPk(notificationId);
        if (!notification) throw new Error('Notification not found');

        notification.isRead = true;
        notification.readAt = new Date();
        await notification.save();

        return notification;
    }

    /**
     * Mark all as read
     */
    async markAllAsRead(userId) {
        await Notification.update(
            { isRead: true, readAt: new Date() },
            { where: { userId, isRead: false } }
        );

        return { message: 'All notifications marked as read' };
    }

    /**
     * Delete notification
     */
    async deleteNotification(notificationId) {
        const notification = await Notification.findByPk(notificationId);
        if (!notification) throw new Error('Notification not found');

        await notification.destroy();
        return { message: 'Notification deleted' };
    }

    /**
     * Send push notification
     */
    async sendPushNotification(userId, message) {
        // In real app, integrate with Firebase Cloud Messaging or similar
        const notification = await this.createNotification(userId, {
            type: 'PUSH',
            title: message.title,
            message: message.body,
            data: message.data
        });

        return {
            notificationId: notification.id,
            status: 'SENT',
            message: 'Push notification sent'
        };
    }

    /**
     * Broadcast notification to all users
     */
    async broadcastNotification(notificationData) {
        const users = await User.findAll({ attributes: ['id'] });
        const notifications = [];

        for (const user of users) {
            const notification = await this.createNotification(user.id, notificationData);
            notifications.push(notification);
        }

        return {
            sent: notifications.length,
            message: 'Broadcast notification sent'
        };
    }

    /**
     * Get unread count
     */
    async getUnreadCount(userId) {
        const count = await Notification.count({
            where: { userId, isRead: false }
        });

        return { unreadCount: count };
    }
}

module.exports = new NotificationService();
