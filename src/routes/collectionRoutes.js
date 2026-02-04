const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { protect } = require('../middleware/auth');

// Public routes (if any, e.g. viewing a shared collection)
router.get('/share/:id', collectionController.getSharedCollection);

// Protected routes
router.use(protect);

router.post('/', collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.get('/:id', collectionController.getCollectionById);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

router.post('/:id/share', collectionController.shareCollection);
router.post('/:id/products', collectionController.addProductToCollection);
router.delete('/:id/products/:productId', collectionController.removeProductFromCollection);

module.exports = router;
