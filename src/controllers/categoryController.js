const categoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCategoryProducts = async (req, res, next) => {
    try {
        const products = await categoryService.getCategoryProducts(req.params.id);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.reorderCategories = async (req, res, next) => { res.json({ message: 'Categories reordered' }); };
