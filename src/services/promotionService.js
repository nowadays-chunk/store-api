const { Promotion } = require('../models');
const { Op } = require('sequelize');

class PromotionService {
    /**
     * Create a new promotion
     */
    async createPromotion(data) {
        return await Promotion.create(data);
    }

    /**
     * Get all promotions with filtering
     */
    async listPromotions(query = {}) {
        const { active, startDate, endDate } = query;
        const where = {};

        if (active !== undefined) {
            where.isActive = active === 'true';
        }

        if (startDate) {
            where.startDate = { [Op.gte]: new Date(startDate) };
        }

        if (endDate) {
            where.endDate = { [Op.lte]: new Date(endDate) };
        }

        return await Promotion.findAll({ where, order: [['createdAt', 'DESC']] });
    }

    /**
     * Get promotion by ID
     */
    async getPromotion(id) {
        const promotion = await Promotion.findByPk(id);
        if (!promotion) {
            throw new Error('Promotion not found');
        }
        return promotion;
    }

    /**
     * Update promotion
     */
    async updatePromotion(id, data) {
        const promotion = await this.getPromotion(id);
        await promotion.update(data);
        return promotion;
    }

    /**
     * Delete promotion
     */
    async deletePromotion(id) {
        const promotion = await this.getPromotion(id);
        await promotion.destroy();
        return { message: 'Promotion deleted successfully' };
    }
}

module.exports = new PromotionService();
