const inventoryService = require('../services/inventoryService');

/**
 * Get inventory for product
 */
exports.getInventory = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const inventory = await inventoryService.getInventory(productId);
        res.json(inventory);
    } catch (error) {
        next(error);
    }
};

/**
 * Adjust stock
 */
exports.adjustStock = async (req, res, next) => {
    try {
        const { productId, warehouseId, quantity, reason } = req.body;
        const inventory = await inventoryService.adjustStock(productId, warehouseId, quantity, reason);
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Transfer stock
 */
exports.transferStock = async (req, res, next) => {
    try {
        const { productId, fromWarehouseId, toWarehouseId, quantity } = req.body;
        const result = await inventoryService.transferStock(productId, fromWarehouseId, toWarehouseId, quantity);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Reserve inventory
 */
exports.reserveInventory = async (req, res, next) => {
    try {
        const { productId, quantity, orderId } = req.body;
        const inventory = await inventoryService.reserveInventory(productId, quantity, orderId);
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get low stock products
 */
exports.getLowStock = async (req, res, next) => {
    try {
        const { threshold } = req.query;
        const products = await inventoryService.getLowStockProducts(parseInt(threshold) || 10);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

/**
 * Get stock movements
 */
exports.getStockMovements = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const movements = await inventoryService.getStockMovements(productId, req.query);
        res.json({ movements });
    } catch (error) {
        next(error);
    }
};

/**
 * Forecast inventory
 */
exports.forecastInventory = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { days } = req.query;
        const forecast = await inventoryService.forecastInventory(productId, parseInt(days) || 30);
        res.json(forecast);
    } catch (error) {
        next(error);
    }
};

/**
 * Get all inventory
 */
exports.getAllInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.findAll({
            include: [
                { model: Product, as: 'product' },
                { model: Warehouse, as: 'warehouse' }
            ]
        });
        res.json({ inventory });
    } catch (error) {
        next(error);
    }
};

/**
 * Get out of stock products
 */
exports.getOutOfStock = async (req, res, next) => {
    try {
        const products = await inventoryService.getLowStockProducts(0);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk update inventory
 */
exports.bulkUpdate = async (req, res, next) => {
    try {
        const { updates } = req.body;
        const results = [];

        for (const update of updates) {
            try {
                const inventory = await inventoryService.adjustStock(
                    update.productId,
                    update.warehouseId,
                    update.quantity,
                    'Bulk update'
                );
                results.push({ success: true, inventory });
            } catch (error) {
                results.push({ success: false, error: error.message });
            }
        }

        res.json({ results });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
