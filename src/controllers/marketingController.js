const marketingService = require('../services/marketingService');

/**
 * Create campaign
 */
exports.createCampaign = async (req, res, next) => {
    try {
        const campaign = await marketingService.createCampaign(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get active campaigns
 */
exports.getActiveCampaigns = async (req, res, next) => {
    try {
        const campaigns = await marketingService.getActiveCampaigns();
        res.json({ campaigns });
    } catch (error) {
        next(error);
    }
};

/**
 * Send email campaign
 */
exports.sendEmailCampaign = async (req, res, next) => {
    try {
        const { campaignId, recipientSegment } = req.body;
        const result = await marketingService.sendEmailCampaign(campaignId, recipientSegment);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Track campaign performance
 */
exports.trackPerformance = async (req, res, next) => {
    try {
        const { campaignId } = req.params;
        const performance = await marketingService.trackCampaignPerformance(campaignId);
        res.json(performance);
    } catch (error) {
        next(error);
    }
};

/**
 * Create coupon
 */
exports.createCoupon = async (req, res, next) => {
    try {
        const coupon = await marketingService.createCoupon(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Validate coupon
 */
exports.validateCoupon = async (req, res, next) => {
    try {
        const { code, cartTotal } = req.body;
        const result = await marketingService.validateCoupon(code, req.user.id, cartTotal);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get customer segments
 */
exports.getSegments = async (req, res, next) => {
    try {
        const segments = await marketingService.getCustomerSegments();
        res.json({ segments });
    } catch (error) {
        next(error);
    }
};
