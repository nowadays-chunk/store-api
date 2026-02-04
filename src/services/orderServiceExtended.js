const { Order, OrderItem, Product, User, sequelize } = require('../models');

class OrderService {
    /**
     * Get all orders (admin)
     */
    async getAllOrders(filters = {}) {
        let { page = 1, limit = 20, status } = filters;
        page = parseInt(page, 10) || 1;
        limit = parseInt(limit, 10) || 20;
        const offset = (page - 1) * limit;

        const where = {};
        if (status) where.status = status;

        const { rows: orders, count } = await Order.findAndCountAll({
            where,
            include: [
                { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] },
                { model: User, as: 'user', attributes: ['id', 'email', 'firstName', 'lastName'] }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            orders,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Get order statistics
     */
    async getOrderStats() {
        const totalOrders = await Order.count();
        const pendingOrders = await Order.count({ where: { status: 'PENDING' } });
        const completedOrders = await Order.count({ where: { status: 'DELIVERED' } });
        const cancelledOrders = await Order.count({ where: { status: 'CANCELLED' } });

        const totalRevenue = await Order.sum('total', {
            where: { status: ['DELIVERED', 'SHIPPED'] }
        });

        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            cancelledOrders,
            totalRevenue: totalRevenue || 0
        };
    }

    /**
     * Get fulfillment queue
     */
    async getFulfillmentQueue() {
        const orders = await Order.findAll({
            where: { status: ['PENDING', 'PROCESSING'] },
            include: [
                { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] },
                { model: User, as: 'user', attributes: ['email', 'firstName', 'lastName'] }
            ],
            order: [['createdAt', 'ASC']]
        });

        return orders;
    }

    /**
     * Hold order
     */
    async holdOrder(orderId, reason) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'ON_HOLD';
        order.holdReason = reason;
        await order.save();

        return order;
    }

    /**
     * Release order from hold
     */
    async releaseOrder(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'PENDING';
        order.holdReason = null;
        await order.save();

        return order;
    }

    /**
     * Add order note
     */
    async addNote(orderId, note, userId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        const notes = order.notes || [];
        notes.push({
            text: note,
            userId,
            timestamp: new Date()
        });

        order.notes = notes;
        await order.save();

        return { message: 'Note added', notes };
    }

    /**
     * Get order notes
     */
    async getNotes(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        return order.notes || [];
    }

    /**
     * Get order timeline
     */
    async getTimeline(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        const timeline = [
            { event: 'Order Created', timestamp: order.createdAt, status: 'PENDING' },
            { event: 'Order Updated', timestamp: order.updatedAt, status: order.status }
        ];

        if (order.shippedAt) {
            timeline.push({ event: 'Order Shipped', timestamp: order.shippedAt, status: 'SHIPPED' });
        }

        if (order.deliveredAt) {
            timeline.push({ event: 'Order Delivered', timestamp: order.deliveredAt, status: 'DELIVERED' });
        }

        return timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    /**
     * Create manual order (admin)
     */
    async createManualOrder(orderData) {
        const t = await sequelize.transaction();

        try {
            const order = await Order.create({
                ...orderData,
                status: 'PENDING',
                isManual: true
            }, { transaction: t });

            // Create order items
            if (orderData.items && orderData.items.length > 0) {
                for (const item of orderData.items) {
                    await OrderItem.create({
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }, { transaction: t });
                }
            }

            await t.commit();

            const createdOrder = await Order.findByPk(order.id, {
                include: [{ model: OrderItem, as: 'items' }]
            });

            return createdOrder;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Reprocess order
     */
    async reprocessOrder(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'PROCESSING';
        await order.save();

        return order;
    }

    /**
     * Reship order
     */
    async reshipOrder(orderId, trackingNumber) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'SHIPPED';
        order.trackingNumber = trackingNumber;
        order.shippedAt = new Date();
        await order.save();

        return order;
    }

    /**
     * Write off order
     */
    async writeoffOrder(orderId, reason) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'WRITTEN_OFF';
        order.writeoffReason = reason;
        await order.save();

        return order;
    }

    /**
     * Add adjustment to order
     */
    async addAdjustment(orderId, adjustment) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        const adjustments = order.adjustments || [];
        adjustments.push({
            type: adjustment.type,
            amount: adjustment.amount,
            reason: adjustment.reason,
            timestamp: new Date()
        });

        order.adjustments = adjustments;
        order.total = parseFloat(order.total) + parseFloat(adjustment.amount);
        await order.save();

        return order;
    }
}

module.exports = new OrderService();
