const db = require('../models');
const Collection = db.Collection;
const Product = db.Product;

const collectionController = {
    // Public: Get shared collection
    getSharedCollection: async (req, res, next) => {
        try {
            const collection = await Collection.findByPk(req.params.id, {
                include: [{ model: Product, as: 'products' }]
            });
            if (!collection || !collection.isActive) {
                return res.status(404).json({ message: 'Collection not found or private' });
            }
            res.json({ success: true, collection });
        } catch (error) {
            next(error);
        }
    },

    // Protected: Get user's collections
    getCollections: async (req, res, next) => {
        try {
            const collections = await Collection.findAll({
                where: { userId: req.user.id }
            });
            res.json({ success: true, collections });
        } catch (error) {
            next(error);
        }
    },

    getCollectionById: async (req, res, next) => {
        try {
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id },
                include: [{ model: Product, as: 'products' }]
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });
            res.json({ success: true, collection });
        } catch (error) {
            next(error);
        }
    },

    createCollection: async (req, res, next) => {
        try {
            const collection = await Collection.create({
                ...req.body,
                userId: req.user.id
            });
            res.status(201).json({ success: true, collection });
        } catch (error) {
            next(error);
        }
    },

    updateCollection: async (req, res, next) => {
        try {
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });

            await collection.update(req.body);
            res.json({ success: true, collection });
        } catch (error) {
            next(error);
        }
    },

    deleteCollection: async (req, res, next) => {
        try {
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });

            await collection.destroy();
            res.json({ success: true, message: 'Collection deleted' });
        } catch (error) {
            next(error);
        }
    },

    shareCollection: async (req, res, next) => {
        try {
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });

            // Just toggle isActive or similar for "sharing"
            await collection.update({ isActive: true });

            const shareUrl = `${req.protocol}://${req.get('host')}/api/collections/share/${collection.id}`;
            res.json({ success: true, shareUrl, message: 'Collection is now public' });
        } catch (error) {
            next(error);
        }
    },

    addProductToCollection: async (req, res, next) => {
        try {
            const { productId } = req.body;
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });

            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).json({ message: 'Product not found' });

            await collection.addProduct(product);
            res.json({ success: true, message: 'Product added to collection' });
        } catch (error) {
            next(error);
        }
    },

    removeProductFromCollection: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const collection = await Collection.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!collection) return res.status(404).json({ message: 'Collection not found' });

            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).json({ message: 'Product not found' });

            await collection.removeProduct(product);
            res.json({ success: true, message: 'Product removed from collection' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = collectionController;
