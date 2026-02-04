const dashboardService = require('../services/dashboardService');

/**
 * Get dashboard overview
 */
exports.getOverview = async (req, res, next) => {
    try {
        const overview = await dashboardService.getOverview();
        res.json(overview);
    } catch (error) {
        next(error);
    }
};

/**
 * Get sales chart data
 */
exports.getSalesChart = async (req, res, next) => {
    try {
        const { days } = req.query;
        const chartData = await dashboardService.getSalesChart(parseInt(days) || 30);
        res.json({ chartData });
    } catch (error) {
        next(error);
    }
};

/**
 * Get top products
 */
exports.getTopProducts = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const products = await dashboardService.getTopProducts(parseInt(limit) || 10);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

/**
 * Get recent orders
 */
exports.getRecentOrders = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const orders = await dashboardService.getRecentOrders(parseInt(limit) || 10);
        res.json({ orders });
    } catch (error) {
        next(error);
    }
};

/**
 * Get order status distribution
 */
exports.getOrderStatusDistribution = async (req, res, next) => {
    try {
        const distribution = await dashboardService.getOrderStatusDistribution();
        res.json({ distribution });
    } catch (error) {
        next(error);
    }
};
