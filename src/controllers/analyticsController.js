const db = require('../models');
const AnalyticsEvent = db.AnalyticsEvent;

const analyticsController = {
    trackEvent: async (req, res, next) => {
        try {
            const { eventName, category, properties, sessionId, deviceInfo } = req.body;

            // Async fire and forget usually, but here we wait to confirm save
            await AnalyticsEvent.create({
                eventName,
                category,
                properties,
                sessionId,
                deviceInfo,
                userId: req.user ? req.user.id : null
            });

            res.status(201).json({ success: true, message: 'Event tracked' });
        } catch (error) {
            next(error);
        }
    },

    getEvents: async (req, res, next) => {
        try {
            // Admin only usually
            const events = await AnalyticsEvent.findAll({
                limit: 100,
                order: [['createdAt', 'DESC']]
            });
            res.json({ success: true, events });
        } catch (error) {
            next(error);
        }
    },

    getSessionAnalytics: async (req, res, next) => {
        // Aggregate logic mock
        res.json({
            success: true,
            stats: {
                activeSessions: 42,
                avgDuration: '5m 30s'
            }
        });
    },

    getProductAnalytics: async (req, res, next) => {
        res.json({
            success: true,
            stats: {
                mostViewed: [],
                conversionRate: '2.5%'
            }
        });
    },

    getSalesAnalytics: async (req, res, next) => {
        res.json({
            success: true,
            stats: {
                totalRevenue: 50000,
                orders: 150,
                averageOrderValue: 333
            }
        });
    },

    getCustomerAnalytics: async (req, res, next) => {
        res.json({
            success: true,
            stats: {
                totalCustomers: 1200,
                newCustomers: 50,
                returningCustomers: 1150
            }
        });
    },

    getConversionAnalytics: async (req, res, next) => {
        res.json({
            success: true,
            stats: {
                cartAbandonmentRate: '65%',
                checkoutConversionRate: '35%'
            }
        });
    },

    getTrafficAnalytics: async (req, res, next) => {
        res.json({
            success: true,
            stats: {
                totalVisits: 10000,
                uniqueVisitors: 8500,
                bounceRate: '40%'
            }
        });
    }
};

module.exports = analyticsController;
