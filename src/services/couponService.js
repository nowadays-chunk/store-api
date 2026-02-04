const { Coupon, sequelize } = require('../models');

class CouponService {
    /**
     * Get all coupons
     */
    async getAllCoupons(filters = {}) {
        const { page = 1, limit = 20, isActive } = filters;
        const offset = (page - 1) * limit;

        const where = {};
        if (isActive !== undefined) where.isActive = isActive;

        const { rows: coupons, count } = await Coupon.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            coupons,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Create coupon
     */
    async createCoupon(couponData) {
        const coupon = await Coupon.create(couponData);
        return coupon;
    }

    /**
     * Update coupon
     */
    async updateCoupon(couponId, updates) {
        const coupon = await Coupon.findByPk(couponId);
        if (!coupon) throw new Error('Coupon not found');

        await coupon.update(updates);
        return coupon;
    }

    /**
     * Delete coupon
     */
    async deleteCoupon(couponId) {
        const coupon = await Coupon.findByPk(couponId);
        if (!coupon) throw new Error('Coupon not found');

        await coupon.destroy();
        return { message: 'Coupon deleted' };
    }

    /**
     * Validate coupon
     */
    async validateCoupon(code) {
        const coupon = await Coupon.findOne({
            where: { code, isActive: true }
        });

        if (!coupon) throw new Error('Invalid coupon code');

        const now = new Date();
        if (coupon.expiresAt && coupon.expiresAt < now) {
            throw new Error('Coupon has expired');
        }

        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
            throw new Error('Coupon usage limit reached');
        }

        return coupon;
    }

    /**
     * Apply coupon
     */
    async applyCoupon(code, cartTotal) {
        const coupon = await this.validateCoupon(code);

        if (coupon.minimumPurchase && cartTotal < coupon.minimumPurchase) {
            throw new Error(`Minimum purchase of $${coupon.minimumPurchase} required`);
        }

        let discount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else {
            discount = coupon.discountValue;
        }

        // Increment usage count
        coupon.usageCount = (coupon.usageCount || 0) + 1;
        await coupon.save();

        return {
            coupon,
            discount,
            finalTotal: cartTotal - discount
        };
    }
}

module.exports = new CouponService();
