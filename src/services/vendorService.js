const { Vendor, Product, Payout, sequelize } = require('../models');

class VendorService {
    /**
     * Get all vendors
     */
    async getAllVendors(filters = {}) {
        const { page = 1, limit = 20, status } = filters;
        const offset = (page - 1) * limit;

        const where = {};
        if (status) where.status = status;

        const { rows: vendors, count } = await Vendor.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            vendors,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Create vendor
     */
    async createVendor(vendorData) {
        const vendor = await Vendor.create(vendorData);
        return vendor;
    }

    /**
     * Update vendor
     */
    async updateVendor(vendorId, updates) {
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) throw new Error('Vendor not found');

        await vendor.update(updates);
        return vendor;
    }

    /**
     * Get vendor products
     */
    async getVendorProducts(vendorId) {
        const products = await Product.findAll({
            where: { vendorId },
            order: [['createdAt', 'DESC']]
        });

        return products;
    }

    /**
     * Create payout
     */
    async createPayout(vendorId, amount, period) {
        const payout = await Payout.create({
            vendorId,
            amount,
            period,
            status: 'PENDING'
        });

        return payout;
    }

    /**
     * Process payout
     */
    async processPayout(payoutId) {
        const payout = await Payout.findByPk(payoutId);
        if (!payout) throw new Error('Payout not found');

        payout.status = 'PROCESSING';
        await payout.save();

        // In real app, integrate with payment processor
        setTimeout(async () => {
            payout.status = 'COMPLETED';
            payout.processedAt = new Date();
            await payout.save();
        }, 1000);

        return payout;
    }

    /**
     * Get vendor payouts
     */
    async getVendorPayouts(vendorId) {
        const payouts = await Payout.findAll({
            where: { vendorId },
            order: [['createdAt', 'DESC']]
        });

        return payouts;
    }

    /**
     * Calculate vendor commission
     */
    async calculateCommission(vendorId, orderId) {
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) throw new Error('Vendor not found');

        const commissionRate = vendor.commissionRate || 0.15; // 15% default

        // In real app, calculate from order items
        const orderTotal = 100; // Mock value
        const commission = orderTotal * commissionRate;

        return {
            vendorId,
            orderId,
            orderTotal,
            commissionRate,
            commission
        };
    }

    /**
     * Approve vendor
     */
    async approveVendor(vendorId) {
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) throw new Error('Vendor not found');

        vendor.status = 'APPROVED';
        vendor.approvedAt = new Date();
        await vendor.save();

        return vendor;
    }

    /**
     * Suspend vendor
     */
    async suspendVendor(vendorId, reason) {
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) throw new Error('Vendor not found');

        vendor.status = 'SUSPENDED';
        vendor.suspensionReason = reason;
        await vendor.save();

        return vendor;
    }
}

module.exports = new VendorService();
