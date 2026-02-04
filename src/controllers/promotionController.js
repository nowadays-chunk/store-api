const promotionService = require('../services/promotionService');
const couponController = require('./couponController');

const promotionController = {
    getAllPromotions: async (req, res, next) => {
        try {
            const promotions = await promotionService.listPromotions(req.query);
            res.json({ promotions });
        } catch (error) {
            next(error);
        }
    },

    listPromotions: async (req, res, next) => {
        try {
            const promotions = await promotionService.listPromotions(req.query);
            res.json({ promotions });
        } catch (error) {
            next(error);
        }
    },

    createPromotion: async (req, res, next) => {
        try {
            const promotion = await promotionService.createPromotion(req.body);
            res.status(201).json(promotion);
        } catch (error) {
            next(error);
        }
    },

    updatePromotion: async (req, res, next) => {
        try {
            const promotion = await promotionService.updatePromotion(req.params.id, req.body);
            res.json(promotion);
        } catch (error) {
            next(error);
        }
    },

    deletePromotion: async (req, res, next) => {
        try {
            const result = await promotionService.deletePromotion(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    // Delegate coupon requests to couponController if they are still routed here
    createCoupon: couponController.createCoupon,
    updateCoupon: couponController.updateCoupon,
    deleteCoupon: couponController.deleteCoupon,
    validateCoupon: couponController.validateCoupon
};

module.exports = promotionController;

