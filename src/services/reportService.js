const { Order, Product, User, sequelize } = require('../models');

class ReportService {
    /**
     * Generate sales report
     */
    async generateSalesReport(startDate, endDate) {
        const orders = await Order.findAll({
            where: {
                createdAt: {
                    [sequelize.Op.between]: [startDate, endDate]
                },
                status: { [sequelize.Op.in]: ['DELIVERED', 'SHIPPED'] }
            },
            include: ['items']
        });

        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            period: { startDate, endDate },
            totalRevenue,
            totalOrders,
            averageOrderValue,
            orders
        };
    }

    /**
     * Generate product performance report
     */
    async generateProductReport(startDate, endDate) {
        const products = await Product.findAll({
            include: [{
                model: OrderItem,
                as: 'orderItems',
                where: {
                    createdAt: {
                        [sequelize.Op.between]: [startDate, endDate]
                    }
                },
                required: false
            }]
        });

        const productStats = products.map(product => {
            const totalSold = product.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            const revenue = product.orderItems?.reduce((sum, item) =>
                sum + (parseFloat(item.price) * item.quantity), 0) || 0;

            return {
                productId: product.id,
                name: product.name,
                totalSold,
                revenue,
                averagePrice: totalSold > 0 ? revenue / totalSold : 0
            };
        });

        return {
            period: { startDate, endDate },
            products: productStats.sort((a, b) => b.revenue - a.revenue)
        };
    }

    /**
     * Generate customer report
     */
    async generateCustomerReport(startDate, endDate) {
        const users = await User.findAll({
            include: [{
                model: Order,
                as: 'orders',
                where: {
                    createdAt: {
                        [sequelize.Op.between]: [startDate, endDate]
                    }
                },
                required: false
            }],
            attributes: { exclude: ['passwordHash'] }
        });

        const customerStats = users.map(user => {
            const totalOrders = user.orders?.length || 0;
            const totalSpent = user.orders?.reduce((sum, order) =>
                sum + parseFloat(order.total), 0) || 0;

            return {
                userId: user.id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                totalOrders,
                totalSpent,
                averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0
            };
        });

        return {
            period: { startDate, endDate },
            customers: customerStats.sort((a, b) => b.totalSpent - a.totalSpent)
        };
    }

    /**
     * Export report to CSV
     */
    async exportToCSV(reportData) {
        // Simple CSV generation
        const headers = Object.keys(reportData[0] || {}).join(',');
        const rows = reportData.map(row =>
            Object.values(row).join(',')
        ).join('\n');

        return `${headers}\n${rows}`;
    }

    /**
     * Schedule report
     */
    async scheduleReport(reportConfig) {
        // In real app, use a job queue like Bull
        return {
            scheduleId: 'SCH-' + Date.now(),
            message: 'Report scheduled',
            config: reportConfig
        };
    }
}

module.exports = new ReportService();
