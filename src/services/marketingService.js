const { Coupon, Promotion, User, Product, sequelize, Sequelize } = require('../models');
const { Op } = Sequelize;

class MarketingService {
    /**
     * Create marketing campaign
     */
    async createCampaign(campaignData) {
        const campaign = await Promotion.create(campaignData);
        return campaign;
    }

    /**
     * Get active campaigns
     */
    async getActiveCampaigns() {
        const now = new Date();
        const campaigns = await Promotion.findAll({
            where: {
                startDate: { [Op.lte]: now },
                endDate: { [Op.gte]: now },
                isActive: true
            }
        });
        return campaigns;
    }

    /**
     * Send email campaign
     */
    async sendEmailCampaign(campaignId, recipientSegment) {
        // In real app, integrate with email service (SendGrid, Mailchimp)
        const users = await User.findAll({
            where: recipientSegment.criteria,
            attributes: ['email', 'firstName', 'lastName']
        });

        return {
            campaignId,
            recipientCount: users.length,
            status: 'QUEUED',
            message: 'Email campaign queued for sending'
        };
    }

    /**
     * Track campaign performance
     */
    async trackCampaignPerformance(campaignId) {
        const campaign = await Promotion.findByPk(campaignId);
        if (!campaign) throw new Error('Campaign not found');

        // Mock analytics (in real app, query actual metrics)
        return {
            campaignId,
            impressions: 1000,
            clicks: 150,
            conversions: 25,
            revenue: 2500,
            ctr: 0.15,
            conversionRate: 0.167
        };
    }

    /**
     * Create coupon code
     */
    async createCoupon(couponData) {
        const coupon = await Coupon.create(couponData);
        return coupon;
    }

    /**
     * Validate and apply coupon
     */
    async validateCoupon(code, userId, cartTotal) {
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

        if (coupon.minimumPurchase && cartTotal < coupon.minimumPurchase) {
            throw new Error(`Minimum purchase of $${coupon.minimumPurchase} required`);
        }

        // Calculate discount
        let discount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discount = (cartTotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else {
            discount = coupon.discountValue;
        }

        return {
            coupon,
            discount,
            finalTotal: cartTotal - discount
        };
    }

    /**
     * Get customer segments
     */
    async getCustomerSegments() {
        // Define segments based on purchase behavior
        const segments = [
            {
                name: 'High Value',
                criteria: { totalSpent: { [Op.gte]: 1000 } }
            },
            {
                name: 'Frequent Buyers',
                criteria: { orderCount: { [Op.gte]: 10 } }
            },
            {
                name: 'New Customers',
                criteria: {
                    createdAt: {
                        [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    }
                }
            }
        ];

        return segments;
    }
}

module.exports = new MarketingService();
