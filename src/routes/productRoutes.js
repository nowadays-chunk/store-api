const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

// Public Routes (No authentication required)
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/recommended', productController.getRecommendedProducts);
router.get('/trending', productController.getTrendingProducts);
router.get('/new-arrivals', productController.getNewArrivals);
router.get('/categories', productController.getAllCategories);
router.get('/brands', productController.getAllBrands);
// Basic Product Routes
router.get('/:id', productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:id/related', productController.getRelatedProducts);
router.post('/:id/view', productController.registerProductView);
router.get('/:id/variants', productController.listVariants);

module.exports = router;
