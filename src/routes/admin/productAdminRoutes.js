const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { protect, restrictTo } = require('../../middleware/auth');

// All routes here require admin access
router.use(protect, restrictTo('admin'));

// Product Management
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
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

// Lifecycle & Operations
router.put('/:id/publish', productController.publishProduct);
router.put('/:id/unpublish', productController.unpublishProduct);
router.put('/:id/archive', productController.archiveProduct);
router.put('/:id/restore', productController.restoreProduct);
router.post('/:id/duplicate', productController.duplicateProduct);
router.put('/:id/seo', productController.updateProductSEO);
router.put('/:id/visibility', productController.changeProductVisibility);
router.put('/:id/slug', productController.updateProductSlug);
router.put('/:id/priority', productController.updateProductPriority);

// Detailed management
router.get('/:id/history', productController.getProductHistory);
router.get('/:id/audit', productController.getProductAuditLog);
router.post('/:id/tags', productController.addProductTag);
router.delete('/:id/tags/:tag', productController.removeProductTag);
router.get('/:id/attributes', productController.getProductAttributes);
router.put('/:id/attributes', productController.updateProductAttributes);
router.get('/:id/specs', productController.getProductSpecs);
router.put('/:id/specs', productController.updateProductSpecs);
router.get('/:id/translations', productController.getProductTranslations);
router.put('/:id/translations', productController.updateProductTranslations);

// Media management
router.post('/:id/images', productController.uploadProductImages);
router.delete('/:id/images/:imageId', productController.deleteProductImage);
router.get('/:id/videos', productController.getProductVideos);
router.post('/:id/videos', productController.addProductVideo);
router.delete('/:id/videos/:videoId', productController.deleteProductVideo);

// Analytics
router.get('/:id/views', productController.getProductViews);
router.get('/:id/sales', productController.getProductSales);
router.get('/:id/conversion', productController.getProductConversion);

// Variant management
router.post('/:id/variants', productController.createVariant);
router.put('/variants/:id', productController.updateVariant);
router.delete('/variants/:id', productController.deleteVariant);
router.put('/variants/:id/sku', productController.updateVariantSKU);
router.put('/variants/:id/barcode', productController.updateVariantBarcode);
router.put('/variants/:id/price', productController.updateVariantPrice);
router.put('/variants/:id/cost', productController.updateVariantCost);
router.put('/variants/:id/weight', productController.updateVariantWeight);
router.put('/variants/:id/dimensions', productController.updateVariantDimensions);

module.exports = router;
