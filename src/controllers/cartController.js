const cartService = require('../services/cartService');

/**
 * Get user's cart
 */
exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

/**
 * Add item to cart
 */
exports.addToCart = async (req, res, next) => {
    try {
        const cart = await cartService.addToCart(req.user.id, req.body);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update cart item quantity
 */
exports.updateCartItem = async (req, res, next) => {
    try {
        const cart = await cartService.updateCartItem(req.user.id, req.params.itemId, req.body.quantity);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Remove item from cart
 */
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await cartService.removeFromCart(req.user.id, req.params.itemId);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Clear cart
 */
exports.clearCart = async (req, res, next) => {
    try {
        await cartService.clearCart(req.user.id);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Apply coupon to cart
 */
exports.applyCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;
        const cart = await cartService.applyCoupon(req.user.id, code);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Remove coupon from cart
 */
exports.removeCoupon = async (req, res, next) => {
    try {
        const cart = await cartService.removeCoupon(req.user.id);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Auto-generated stub functions
exports.addItem = async (req, res, next) => {
    try {
        res.json({ message: 'addItem endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        res.json({ message: 'updateItem endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.removeItem = async (req, res, next) => {
    try {
        res.json({ message: 'removeItem endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.estimateShipping = async (req, res, next) => {
    try {
        res.json({ message: 'estimateShipping endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.validateCart = async (req, res, next) => {
    try {
        res.json({ message: 'validateCart endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

