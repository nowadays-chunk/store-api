const { Category } = require('../models');

class CategoryService {
    async getAllCategories() {
        return await Category.findAll({
            order: [['sortOrder', 'ASC']]
        });
    }

    async getCategoryById(id) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error('Category not found');
        return category;
    }

    async createCategory(data) {
        return await Category.create(data);
    }

    async updateCategory(id, data) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error('Category not found');
        await category.update(data);
        return category;
    }

    async deleteCategory(id) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error('Category not found');
        await category.destroy();
        return { message: 'Category deleted' };
    }

    async getCategoryProducts(id) {
        const { Product } = require('../models');
        return await Product.findAll({
            where: { categoryId: id, status: 'active' }
        });
    }
}

module.exports = new CategoryService();
