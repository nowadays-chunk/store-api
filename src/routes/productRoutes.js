const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Static Routes (Must come before /:id)
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/recommended', productController.getRecommendedProducts);
router.get('/trending', productController.getTrendingProducts);
router.get('/new-arrivals', productController.getNewArrivals);
router.get('/low-stock', productController.getLowStockProducts);
router.get('/out-of-stock', productController.getOutOfStockProducts);
router.get('/backorder', productController.getBackorderProducts);
router.get('/preorder', productController.getPreorderProducts);
router.get('/drafts', productController.getDraftProducts);
router.get('/archived', productController.getArchivedProducts);

// Bulk Operations
router.post('/bulk-import', productController.bulkImportProducts);
router.post('/bulk-update', productController.bulkUpdateProducts);
router.post('/bulk-delete', productController.bulkDeleteProducts);

// Categories & Brands (Legacy placement, keep here or move to own router if not mounted)
router.get('/categories', productController.getAllCategories);
router.get('/brands', productController.getAllBrands);

// Dynamic Routes (ID based)
router.get('/:id', productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Product Lifecycle & Settings
router.put('/:id/publish', productController.publishProduct);
router.put('/:id/unpublish', productController.unpublishProduct);
router.put('/:id/archive', productController.archiveProduct);
router.put('/:id/restore', productController.restoreProduct);
router.post('/:id/duplicate', productController.duplicateProduct);
router.put('/:id/seo', productController.updateProductSEO);
router.put('/:id/visibility', productController.changeProductVisibility);
router.put('/:id/slug', productController.updateProductSlug);
router.put('/:id/priority', productController.updateProductPriority);

// Details & Collections
router.get('/:id/related', productController.getRelatedProducts);
router.get('/:id/history', productController.getProductHistory);
router.get('/:id/audit', productController.getProductAuditLog);

// Tags, Attributes, Specs
router.post('/:id/tags', productController.addProductTag);
router.delete('/:id/tags/:tag', productController.removeProductTag);
router.get('/:id/attributes', productController.getProductAttributes);
router.put('/:id/attributes', productController.updateProductAttributes);
router.get('/:id/specs', productController.getProductSpecs);
router.put('/:id/specs', productController.updateProductSpecs);
router.get('/:id/translations', productController.getProductTranslations);
router.put('/:id/translations', productController.updateProductTranslations);

// Images & Media
router.post('/:id/images', productController.uploadProductImages);
router.delete('/:id/images/:imageId', productController.deleteProductImage);
router.get('/:id/videos', productController.getProductVideos);
router.post('/:id/videos', productController.addProductVideo);
router.delete('/:id/videos/:videoId', productController.deleteProductVideo);

// Analytics
router.get('/:id/views', productController.getProductViews);
router.post('/:id/view', productController.registerProductView);
router.get('/:id/sales', productController.getProductSales);
router.get('/:id/conversion', productController.getProductConversion);

// Stock Configurations
router.put('/:id/backorder', productController.enableBackorder);
router.put('/:id/preorder', productController.enablePreorder);

// Variants
router.get('/:id/variants', productController.listVariants);
router.post('/:id/variants', productController.createVariant);
router.put('/variants/:id', productController.updateVariant); // Existing
router.delete('/variants/:id', productController.deleteVariant); // Was delete /:id/variants/:variantId in list, mapping to specific variant ID URL is cleaner

// Variant Specific Fields
router.put('/variants/:id/sku', productController.updateVariantSKU);
router.put('/variants/:id/barcode', productController.updateVariantBarcode);
router.put('/variants/:id/price', productController.updateVariantPrice);
router.put('/variants/:id/cost', productController.updateVariantCost);
router.put('/variants/:id/weight', productController.updateVariantWeight);
router.put('/variants/:id/dimensions', productController.updateVariantDimensions);

module.exports = router;
