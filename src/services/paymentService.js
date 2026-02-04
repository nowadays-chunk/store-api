const { Payment, Order, sequelize } = require('../models');

class PaymentService {
    /**
     * Process payment
     */
    async processPayment(orderId, paymentData) {
        const t = await sequelize.transaction();

        try {
            const order = await Order.findByPk(orderId, { transaction: t });
            if (!order) throw new Error('Order not found');

            // Create payment record
            const payment = await Payment.create({
                orderId,
                amount: order.total,
                currency: 'USD',
                method: paymentData.method,
                status: 'PENDING',
                transactionId: 'txn_' + Date.now(),
                metadata: paymentData.metadata
            }, { transaction: t });

            // Simulate payment processing
            // In real app, call Stripe/PayPal API
            payment.status = 'COMPLETED';
            payment.processedAt = new Date();
            await payment.save({ transaction: t });

            // Update order
            order.paymentStatus = 'PAID';
            order.paidAt = new Date();
            await order.save({ transaction: t });

            await t.commit();
            return payment;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Refund payment
     */
    async refundPayment(paymentId, amount, reason) {
        const t = await sequelize.transaction();

        try {
            const payment = await Payment.findByPk(paymentId, { transaction: t });
            if (!payment) throw new Error('Payment not found');

            if (payment.status !== 'COMPLETED') {
                throw new Error('Cannot refund incomplete payment');
            }

            const refundAmount = amount || payment.amount;

            // Create refund record
            const refund = await Payment.create({
                orderId: payment.orderId,
                amount: -refundAmount,
                currency: payment.currency,
                method: payment.method,
                status: 'REFUNDED',
                transactionId: 'rfnd_' + Date.now(),
                parentPaymentId: payment.id,
                refundReason: reason,
                processedAt: new Date()
            }, { transaction: t });

            // Update original payment
            payment.refundedAmount = (payment.refundedAmount || 0) + refundAmount;
            if (payment.refundedAmount >= payment.amount) {
                payment.status = 'REFUNDED';
            } else {
                payment.status = 'PARTIALLY_REFUNDED';
            }
            await payment.save({ transaction: t });

            // Update order
            const order = await Order.findByPk(payment.orderId, { transaction: t });
            order.paymentStatus = payment.status === 'REFUNDED' ? 'REFUNDED' : 'PARTIALLY_REFUNDED';
            await order.save({ transaction: t });

            await t.commit();
            return refund;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Capture payment (for authorized payments)
     */
    async capturePayment(paymentId) {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) throw new Error('Payment not found');

        if (payment.status !== 'AUTHORIZED') {
            throw new Error('Payment not in authorized state');
        }

        payment.status = 'COMPLETED';
        payment.capturedAt = new Date();
        await payment.save();

        return payment;
    }

    /**
     * Void payment (cancel authorization)
     */
    async voidPayment(paymentId) {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) throw new Error('Payment not found');

        if (payment.status !== 'AUTHORIZED') {
            throw new Error('Can only void authorized payments');
        }

        payment.status = 'VOIDED';
        payment.voidedAt = new Date();
        await payment.save();

        return payment;
    }

    /**
     * Get payment by order
     */
    async getPaymentsByOrder(orderId) {
        const payments = await Payment.findAll({
            where: { orderId },
            order: [['createdAt', 'DESC']]
        });

        return payments;
    }

    /**
     * Verify payment webhook
     */
    async verifyWebhook(webhookData) {
        // In real app, verify signature from payment provider
        const { transactionId, status } = webhookData;

        const payment = await Payment.findOne({
            where: { transactionId }
        });

        if (payment) {
            payment.status = status;
            await payment.save();
        }

        return { verified: true, payment };
    }
}

module.exports = new PaymentService();
