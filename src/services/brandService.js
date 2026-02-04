const { Brand, Product, sequelize } = require('../models');

class BrandService {
    /**
     * Get all brands
     */
    async getAllBrands(filters = {}) {
        const { page = 1, limit = 20 } = filters;
        const offset = (page - 1) * limit;

        const { rows: brands, count } = await Brand.findAndCountAll({
            limit,
            offset,
            order: [['name', 'ASC']]
        });

        return {
            brands,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Get brand by ID
     */
    async getBrandById(brandId) {
        const brand = await Brand.findByPk(brandId, {
            include: [{ model: Product, as: 'products' }]
        });

        if (!brand) throw new Error('Brand not found');
        return brand;
    }

    /**
     * Create brand
     */
    async createBrand(brandData) {
        const brand = await Brand.create(brandData);
        return brand;
    }

    /**
     * Update brand
     */
    async updateBrand(brandId, updates) {
        const brand = await Brand.findByPk(brandId);
        if (!brand) throw new Error('Brand not found');

        await brand.update(updates);
        return brand;
    }

    /**
     * Delete brand
     */
    async deleteBrand(brandId) {
        const brand = await Brand.findByPk(brandId);
        if (!brand) throw new Error('Brand not found');

        // Check if brand has products
        const productCount = await Product.count({ where: { brandId } });
        if (productCount > 0) {
            throw new Error(`Cannot delete brand with ${productCount} products`);
        }

        await brand.destroy();
        return { message: 'Brand deleted' };
    }

    /**
     * Get brand products
     */
    async getBrandProducts(brandId) {
        const products = await Product.findAll({
            where: { brandId },
            order: [['createdAt', 'DESC']]
        });

        return products;
    }
}

module.exports = new BrandService();
