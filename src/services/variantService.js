const { ProductVariant } = require('../models');

class VariantService {
    async getProductVariants(productId) {
        return await ProductVariant.findAll({ where: { productId } });
    }

    async createVariant(productId, variantData) {
        return await ProductVariant.create({ ...variantData, productId });
    }

    async updateVariant(variantId, variantData) {
        const variant = await ProductVariant.findByPk(variantId);
        if (!variant) throw new Error('Variant not found');
        await variant.update(variantData);
        return variant;
    }

    async deleteVariant(variantId) {
        const variant = await ProductVariant.findByPk(variantId);
        if (!variant) throw new Error('Variant not found');
        await variant.destroy();
        return { message: 'Variant deleted' };
    }

    async updateVariantStock(variantId, quantity) {
        const variant = await ProductVariant.findByPk(variantId);
        if (!variant) throw new Error('Variant not found');
        variant.quantity = quantity;
        await variant.save();
        return variant;
    }
}

module.exports = new VariantService();
