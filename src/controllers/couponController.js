const couponService = require('../services/couponService');

exports.getAllCoupons = async (req, res, next) => {
    try {
        const result = await couponService.getAllCoupons(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.getCouponById = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
        res.json(coupon);
    } catch (error) {
        next(error);
    }
};

exports.createCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.createCoupon(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.updateCoupon(req.params.id, req.body);
        res.json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCoupon = async (req, res, next) => {
    try {
        const result = await couponService.deleteCoupon(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.validateCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;
        const coupon = await couponService.validateCoupon(code);
        res.json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.applyCoupon = async (req, res, next) => {
    try {
        const { code, cartTotal } = req.body;
        const result = await couponService.applyCoupon(code, cartTotal);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
