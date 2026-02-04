const { Order, OrderItem, Cart, CartItem, Product } = require('../models');

class OrderService {
    async createOrder(userId, orderData) {
        const cart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }]
        });

        if (!cart || !cart.items || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        const orderNumber = `ORD-${Date.now()}`;

        const order = await Order.create({
            orderNumber,
            userId,
            subtotal: cart.subtotal,
            tax: cart.tax || 0,
            shipping: orderData.shipping || 10,
            discount: cart.discount || 0,
            total: parseFloat(cart.total) + (orderData.shipping || 10),
            shippingAddress: orderData.shippingAddress,
            billingAddress: orderData.billingAddress,
            paymentMethod: orderData.paymentMethod,
            status: 'pending',
            paymentStatus: 'pending'
        });

        // Create order items from cart
        for (const cartItem of cart.items) {
            await OrderItem.create({
                orderId: order.id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: cartItem.price,
                productName: cartItem.product.name
            });
        }

        // Clear cart
        await CartItem.destroy({ where: { cartId: cart.id } });

        return this.getOrderById(order.id);
    }

    async getOrderById(orderId) {
        const order = await Order.findByPk(orderId, {
            include: [{ model: OrderItem, as: 'items' }]
        });
        if (!order) throw new Error('Order not found');
        return order;
    }

    async getUserOrders(userId) {
        const orders = await Order.findAll({
            where: { userId },
            include: [{ model: OrderItem, as: 'items' }],
            order: [['createdAt', 'DESC']]
        });
        return orders;
    }

    async updateOrderStatus(orderId, status) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');
        order.status = status;
        await order.save();
        return order;
    }

    async updateTracking(orderId, trackingNumber) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');
        order.trackingNumber = trackingNumber;
        await order.save();
        return order;
    }

    async cancelOrder(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');
        if (order.status === 'shipped' || order.status === 'delivered') {
            throw new Error('Cannot cancel shipped or delivered orders');
        }
        order.status = 'cancelled';
        await order.save();
        return order;
    }
}

module.exports = new OrderService();
