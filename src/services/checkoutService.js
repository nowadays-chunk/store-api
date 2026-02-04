const { Cart, CartItem, Order, OrderItem, Inventory, Product, sequelize } = require('../models');

class CheckoutService {
    /**
     * Start checkout process - validate cart and calculate totals
     */
    async startCheckout(userId) {
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                as: 'items',
                include: [{ model: Product, as: 'product' }]
            }]
        });

        if (!cart || !cart.items || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        // Check inventory availability for all items
        for (const item of cart.items) {
            const inventory = await Inventory.findOne({
                where: { productId: item.productId }
            });

            if (!inventory || inventory.quantity < item.quantity) {
                throw new Error(`Insufficient stock for ${item.product?.name || 'product'}`);
            }
        }

        // Calculate totals
        const subtotal = cart.items.reduce((sum, item) =>
            sum + (parseFloat(item.price) * item.quantity), 0);

        const taxRate = 0.1; // 10% tax
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        return {
            cartId: cart.id,
            items: cart.items.map(item => ({
                productId: item.productId,
                name: item.product?.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            subtotal,
            tax,
            total,
            currency: 'USD'
        };
    }

    /**
     * Select shipping method and calculate shipping cost
     */
    async selectShipping(userId, shippingMethodId) {
        const cart = await Cart.findOne({
            where: { userId },
            include: ['items']
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        // Mock shipping rates (in real app, call shipping API)
        const shippingRates = {
            'standard': { cost: 5.99, days: '5-7' },
            'express': { cost: 15.99, days: '2-3' },
            'overnight': { cost: 29.99, days: '1' }
        };

        const selectedRate = shippingRates[shippingMethodId] || shippingRates.standard;

        return {
            method: shippingMethodId,
            cost: selectedRate.cost,
            estimatedDays: selectedRate.days
        };
    }

    /**
     * Create payment intent (for Stripe/payment processor)
     */
    async createPaymentIntent(userId, amount) {
        // In real app, call Stripe API
        const paymentIntent = {
            id: 'pi_' + Date.now(),
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            status: 'requires_payment_method',
            clientSecret: 'secret_' + Date.now()
        };

        return paymentIntent;
    }

    /**
     * Confirm checkout and create order (with transaction)
     */
    async confirmCheckout(userId, checkoutData) {
        const t = await sequelize.transaction();

        try {
            // 1. Get cart with items
            const cart = await Cart.findOne({
                where: { userId },
                include: [{
                    model: CartItem,
                    as: 'items',
                    include: [{ model: Product, as: 'product' }]
                }]
            });

            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }

            // 2. Calculate totals
            const subtotal = cart.items.reduce((sum, item) =>
                sum + (parseFloat(item.price) * item.quantity), 0);
            const tax = subtotal * 0.1;
            const shippingCost = parseFloat(checkoutData.shippingCost || 0);
            const total = subtotal + tax + shippingCost;

            // 3. Create order
            const order = await Order.create({
                userId,
                status: 'PENDING',
                subtotal,
                tax,
                shippingCost,
                total,
                shippingAddress: checkoutData.shippingAddress,
                billingAddress: checkoutData.billingAddress,
                paymentMethod: checkoutData.paymentMethod,
                paymentIntentId: checkoutData.paymentIntentId
            }, { transaction: t });

            // 4. Create order items and reduce inventory
            for (const cartItem of cart.items) {
                // Create order item
                await OrderItem.create({
                    orderId: order.id,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    name: cartItem.product?.name || 'Product'
                }, { transaction: t });

                // Reduce inventory
                const inventory = await Inventory.findOne({
                    where: { productId: cartItem.productId },
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });

                if (!inventory || inventory.quantity < cartItem.quantity) {
                    throw new Error(`Insufficient stock for ${cartItem.product?.name}`);
                }

                await inventory.decrement('quantity', {
                    by: cartItem.quantity,
                    transaction: t
                });
            }

            // 5. Clear cart
            await CartItem.destroy({
                where: { cartId: cart.id },
                transaction: t
            });

            await t.commit();

            // Return order with items
            const createdOrder = await Order.findByPk(order.id, {
                include: [{ model: OrderItem, as: 'items' }]
            });

            return createdOrder;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

module.exports = new CheckoutService();
