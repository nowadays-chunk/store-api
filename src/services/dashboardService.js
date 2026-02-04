const { Order, Product, User, sequelize } = require('../models');

class DashboardService {
    /**
     * Get dashboard overview
     */
    async getOverview() {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Total metrics
        const totalUsers = await User.count();
        const totalProducts = await Product.count();
        const totalOrders = await Order.count();

        // Recent metrics (last 30 days)
        const recentOrders = await Order.count({
            where: {
                createdAt: { [sequelize.Op.gte]: thirtyDaysAgo }
            }
        });

        const recentRevenue = await Order.sum('total', {
            where: {
                createdAt: { [sequelize.Op.gte]: thirtyDaysAgo },
                status: { [sequelize.Op.in]: ['DELIVERED', 'SHIPPED'] }
            }
        });

        const newUsers = await User.count({
            where: {
                createdAt: { [sequelize.Op.gte]: thirtyDaysAgo }
            }
        });

        return {
            totals: {
                users: totalUsers,
                products: totalProducts,
                orders: totalOrders
            },
            last30Days: {
                orders: recentOrders,
                revenue: recentRevenue || 0,
                newUsers
            }
        };
    }

    /**
     * Get sales chart data
     */
    async getSalesChart(days = 30) {
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        const orders = await Order.findAll({
            where: {
                createdAt: { [sequelize.Op.gte]: startDate },
                status: { [sequelize.Op.in]: ['DELIVERED', 'SHIPPED'] }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('SUM', sequelize.col('total')), 'revenue'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'orderCount']
            ],
            group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
        });

        return orders;
    }

    /**
     * Get top products
     */
    async getTopProducts(limit = 10) {
        const products = await Product.findAll({
            include: [{
                model: OrderItem,
                as: 'orderItems',
                attributes: []
            }],
            attributes: [
                'id',
                'name',
                [sequelize.fn('SUM', sequelize.col('orderItems.quantity')), 'totalSold'],
                [sequelize.fn('SUM',
                    sequelize.literal('orderItems.quantity * orderItems.price')
                ), 'revenue']
            ],
            group: ['Product.id'],
            order: [[sequelize.literal('revenue'), 'DESC']],
            limit
        });

        return products;
    }

    /**
     * Get recent orders
     */
    async getRecentOrders(limit = 10) {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'user', attributes: ['email', 'firstName', 'lastName'] }
            ],
            order: [['createdAt', 'DESC']],
            limit
        });

        return orders;
    }

    /**
     * Get order status distribution
     */
    async getOrderStatusDistribution() {
        const distribution = await Order.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status']
        });

        return distribution;
    }
}

module.exports = new DashboardService();
