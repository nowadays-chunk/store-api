const paymentService = require('../services/paymentService');

/**
 * Process payment
 */
exports.processPayment = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const payment = await paymentService.processPayment(orderId, req.body);
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Refund payment
 */
exports.refundPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { amount, reason } = req.body;
        const refund = await paymentService.refundPayment(paymentId, amount, reason);
        res.json(refund);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Capture payment
 */
exports.capturePayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const payment = await paymentService.capturePayment(paymentId);
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Void payment
 */
exports.voidPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const payment = await paymentService.voidPayment(paymentId);
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get payments by order
 */
exports.getPaymentsByOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const payments = await paymentService.getPaymentsByOrder(orderId);
        res.json(payments);
    } catch (error) {
        next(error);
    }
};

/**
 * Handle payment webhook
 */
exports.handleWebhook = async (req, res, next) => {
    try {
        const result = await paymentService.verifyWebhook(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
