const checkoutService = require('../services/checkoutService');

/**
 * Start checkout - validate cart and get totals
 */
exports.startCheckout = async (req, res, next) => {
    try {
        const checkout = await checkoutService.startCheckout(req.user.id);
        res.json(checkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Select shipping method
 */
exports.selectShipping = async (req, res, next) => {
    try {
        const { shippingMethodId } = req.body;
        const shipping = await checkoutService.selectShipping(req.user.id, shippingMethodId);
        res.json(shipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Create payment intent
 */
exports.createPaymentIntent = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await checkoutService.createPaymentIntent(req.user.id, amount);
        res.json(paymentIntent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Confirm checkout and create order
 */
exports.confirmCheckout = async (req, res, next) => {
    try {
        const order = await checkoutService.confirmCheckout(req.user.id, req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
