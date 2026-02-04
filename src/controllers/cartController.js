const cartService = require('../services/cartService');

exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

exports.addItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addItem(req.user.id, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const cart = await cartService.updateItem(req.user.id, req.params.id, quantity);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeItem = async (req, res, next) => {
    try {
        const cart = await cartService.removeItem(req.user.id, req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.applyCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;
        const cart = await cartService.applyCoupon(req.user.id, code);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeCoupon = async (req, res, next) => {
    try {
        const cart = await cartService.applyCoupon(req.user.id, null);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

exports.estimateShipping = async (req, res, next) => {
    // Simple estimate
    res.json({ shipping: 10.00, estimatedDays: 5 });
};

exports.validateCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json({ valid: true, cart });
    } catch (error) {
        next(error);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const cart = await cartService.clearCart(req.user.id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};
