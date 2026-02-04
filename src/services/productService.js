const { Product, Category } = require('../models');
const { Op } = require('sequelize');

class ProductService {
    async getAllProducts(filters = {}) {
        let { page = 1, limit = 20, search, categoryId, status, minPrice, maxPrice } = filters;

        // Ensure integers
        page = parseInt(page, 10) || 1;
        limit = parseInt(limit, 10) || 20;

        const offset = (page - 1) * limit;

        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (categoryId) where.categoryId = categoryId;
        if (status) where.status = status;

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = minPrice;
            if (maxPrice) where.price[Op.lte] = maxPrice;
        }

        const { rows: products, count } = await Product.findAndCountAll({
            where,
            limit,
            offset,
            include: [{ model: Category, as: 'category' }],
            order: [['createdAt', 'DESC']]
        });

        return {
            products,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            }
        };
    }

    async getProductById(id) {
        const product = await Product.findByPk(id, {
            include: [{ model: Category, as: 'category' }]
        });
        if (!product) throw new Error('Product not found');
        return product;
    }

    async getProductBySlug(slug) {
        const product = await Product.findOne({
            where: { slug },
            include: [{ model: Category, as: 'category' }]
        });
        if (!product) throw new Error('Product not found');
        return product;
    }

    async createProduct(data) {
        const product = await Product.create(data);
        return product;
    }

    async updateProduct(id, data) {
        const product = await Product.findByPk(id);
        if (!product) throw new Error('Product not found');
        await product.update(data);
        return product;
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) throw new Error('Product not found');
        await product.destroy();
        return { message: 'Product deleted successfully' };
    }

    async searchProducts(query) {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                    { tags: { [Op.contains]: [query] } }
                ],
                status: 'active'
            },
            limit: 20
        });
        return products;
    }

    async getFeaturedProducts() {
        const products = await Product.findAll({
            where: { isFeatured: true, status: 'active' },
            limit: 10,
            order: [['createdAt', 'DESC']]
        });
        return products;
    }
}

module.exports = new ProductService();
