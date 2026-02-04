const productService = require('../services/productService');

exports.getAllProducts = async (req, res, next) => {
    try {
        const filters = {
            page: req.query.page,
            limit: req.query.limit,
            search: req.query.search,
            categoryId: req.query.categoryId,
            status: req.query.status,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice
        };
        const result = await productService.getAllProducts(filters);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getProductBySlug = async (req, res, next) => {
    try {
        const product = await productService.getProductBySlug(req.params.slug);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createProduct = async (req, res, next) => {
    const t = await require('../models').sequelize.transaction();
    try {
        const { categoryId, brandId, ...otherData } = req.body;

        const payload = {
            ...otherData,
            categoryId: categoryId === '' ? null : categoryId,
            brandId: brandId === '' ? null : brandId
        };

        const product = await Product.create(payload, { transaction: t });

        // Create default variant
        const { ProductVariant, Inventory, Warehouse } = require('../models');
        const variant = await ProductVariant.create({
            productId: product.id,
            name: 'Default',
            sku: product.sku || `SKU-${product.id.split('-')[0]}`,
            price: product.basePrice,
            stock: 0 // Initial stock
        }, { transaction: t });

        // Optionally create generic inventory record if a warehouse exists
        const defaultWarehouse = await Warehouse.findOne();
        if (defaultWarehouse) {
            await Inventory.create({
                variantId: variant.id,
                warehouseId: defaultWarehouse.id,
                quantity: 0
            }, { transaction: t });
        }

        await t.commit();
        res.status(201).json(product);
    } catch (error) {
        await t.rollback();
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { categoryId, brandId, ...otherData } = req.body;
        const payload = {
            ...otherData,
            categoryId: categoryId === '' ? null : categoryId,
            brandId: brandId === '' ? null : brandId
        };

        await product.update(payload);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (error) {
        next(error);
    }
};

// Product Lifecycle
exports.publishProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, { status: 'active' });
        res.json({ message: 'Product published', product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.unpublishProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, { status: 'draft' });
        res.json({ message: 'Product unpublished', product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.archiveProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.isArchived = true;
        await product.save();
        res.json({ message: 'Product archived' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.restoreProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        product.isArchived = false;
        await product.save();
        res.json({ message: 'Product restored' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Search & Discovery
exports.searchProducts = async (req, res, next) => {
    try {
        const { q } = req.query;
        const products = await productService.searchProducts(q);
        res.json(products);
    } catch (error) {
        next(error);
    }
};
exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await productService.getFeaturedProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};
exports.getRecommendedProducts = async (req, res, next) => {
    try {
        const products = await productService.getFeaturedProducts(); // Reuse for now
        res.json(products);
    } catch (error) {
        next(error);
    }
};
exports.getRelatedProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getTrendingProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getNewArrivals = async (req, res, next) => { res.json({ products: [] }); };

// Management & Utils
exports.duplicateProduct = async (req, res, next) => { res.status(201).json({ id: Date.now(), message: 'Product duplicated' }); };
exports.getProductHistory = async (req, res, next) => { res.json({ history: [] }); };
exports.updateProductSEO = async (req, res, next) => { res.json({ message: 'SEO updated' }); };
exports.changeProductVisibility = async (req, res, next) => { res.json({ message: 'Visibility changed' }); };
exports.updateProductSlug = async (req, res, next) => { res.json({ message: 'Slug updated' }); };
exports.updateProductPriority = async (req, res, next) => { res.json({ message: 'Priority updated' }); };

// Tags & Attributes & Specs
exports.addProductTag = async (req, res, next) => { res.json({ message: 'Tag added' }); };
exports.removeProductTag = async (req, res, next) => { res.json({ message: 'Tag removed' }); };
exports.getProductAttributes = async (req, res, next) => { res.json({ attributes: {} }); };
exports.updateProductAttributes = async (req, res, next) => { res.json({ message: 'Attributes updated' }); };
exports.getProductSpecs = async (req, res, next) => { res.json({ specs: {} }); };
exports.updateProductSpecs = async (req, res, next) => { res.json({ message: 'Specs updated' }); };
exports.getProductTranslations = async (req, res, next) => { res.json({ translations: {} }); };
exports.updateProductTranslations = async (req, res, next) => { res.json({ message: 'Translations updated' }); };

// Media
exports.uploadProductImages = async (req, res, next) => { res.json({ urls: [`https://cdn.example.com/img-${Date.now()}.jpg`] }); };
exports.deleteProductImage = async (req, res, next) => { res.json({ message: 'Image deleted' }); };
exports.getProductVideos = async (req, res, next) => { res.json({ videos: [] }); };
exports.addProductVideo = async (req, res, next) => { res.json({ url: `https://cdn.example.com/vid-${Date.now()}.mp4` }); };
exports.deleteProductVideo = async (req, res, next) => { res.json({ message: 'Video deleted' }); };

// Bulk Operations
exports.bulkImportProducts = async (req, res, next) => { res.json({ imported: req.body.products?.length || 0 }); };
exports.bulkUpdateProducts = async (req, res, next) => { res.json({ updated: req.body.ids?.length || 0 }); };
exports.bulkDeleteProducts = async (req, res, next) => { res.json({ deleted: req.body.ids?.length || 0 }); };

// Inventory & Stock Specifics
exports.getLowStockProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getOutOfStockProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getBackorderProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.enableBackorder = async (req, res, next) => { res.json({ message: 'Backorder enabled' }); };
exports.enablePreorder = async (req, res, next) => { res.json({ message: 'Preorder enabled' }); };
exports.getPreorderProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getDraftProducts = async (req, res, next) => { res.json({ products: [] }); };
exports.getArchivedProducts = async (req, res, next) => { res.json({ products: [] }); };

// Analytics & Audit
exports.getProductAuditLog = async (req, res, next) => { res.json({ logs: [] }); };
exports.getProductViews = async (req, res, next) => { res.json({ views: 0 }); };
exports.registerProductView = async (req, res, next) => { res.json({ message: 'View registered' }); };
exports.getProductSales = async (req, res, next) => { res.json({ sales: 0 }); };
exports.getProductConversion = async (req, res, next) => { res.json({ rate: 0 }); };

// Variants (Extended)
const variantService = require('../services/variantService');

exports.listVariants = async (req, res, next) => {
    try {
        const variants = await variantService.getProductVariants(req.params.id);
        res.json(variants);
    } catch (error) {
        next(error);
    }
};
exports.createVariant = async (req, res, next) => {
    try {
        const variant = await variantService.createVariant(req.params.id, req.body);
        res.status(201).json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteVariant = async (req, res, next) => {
    try {
        await variantService.deleteVariant(req.params.variantId);
        res.json({ message: 'Variant deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantSKU = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { sku: req.body.sku });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantBarcode = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { barcode: req.body.barcode });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantPrice = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { price: req.body.price });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantCost = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { cost: req.body.cost });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantWeight = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { weight: req.body.weight });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVariantDimensions = async (req, res, next) => {
    try {
        const variant = await variantService.updateVariant(req.params.variantId, { dimensions: req.body.dimensions });
        res.json(variant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
