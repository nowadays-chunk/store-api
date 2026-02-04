const { Coupon } = require('../models');

const couponController = {
    createCoupon: async (req, res, next) => {
        try {
            const coupon = await Coupon.create(req.body);
            res.status(201).json(coupon);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateCoupon: async (req, res, next) => {
        try {
            const coupon = await Coupon.findByPk(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
            await coupon.update(req.body);
            res.json(coupon);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteCoupon: async (req, res, next) => {
        try {
            const coupon = await Coupon.findByPk(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
            await coupon.destroy();
            res.json({ message: 'Coupon deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    validateCoupon: async (req, res, next) => {
        try {
            const { code } = req.body;
            const coupon = await Coupon.findOne({ where: { code, isActive: true } });

            if (!coupon) {
                return res.status(404).json({ valid: false, message: 'Invalid coupon code' });
            }

            if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
                return res.status(400).json({ valid: false, message: 'Coupon expired' });
            }

            if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
                return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
            }

            res.json({ valid: true, coupon });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = couponController;
