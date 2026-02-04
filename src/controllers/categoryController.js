const categoryService = require('../services/categoryService');

/**
 * Get all categories
 */
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json({ categories });
    } catch (error) {
        next(error);
    }
};

/**
 * Get category by ID
 */
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * Create category
 */
exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update category
 */
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete category
 */
exports.deleteCategory = async (req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get category products
 */
exports.getCategoryProducts = async (req, res, next) => {
    try {
        const products = await categoryService.getCategoryProducts(req.params.id);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

/**
 * Get category tree
 */
exports.getCategoryTree = async (req, res, next) => {
    try {
        const tree = await categoryService.getCategoryTree();
        res.json({ tree });
    } catch (error) {
        next(error);
    }
};
