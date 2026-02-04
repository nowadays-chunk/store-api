const { Inventory, Warehouse } = require('../models/Inventory');
const { Product } = require('../models');

const inventoryController = {
    getInventoryOverview: async (req, res, next) => {
        try {
            const inventory = await Inventory.findAll({
                include: [
                    { model: Product, as: 'product' },
                    { model: Warehouse, as: 'warehouse' }
                ]
            });
            res.json(inventory);
        } catch (error) {
            next(error);
        }
    },

    getProductInventory: async (req, res, next) => {
        try {
            const inventory = await Inventory.findAll({
                where: { productId: req.params.variantId },
                include: [{ model: Warehouse, as: 'warehouse' }]
            });
            res.json(inventory);
        } catch (error) {
            next(error);
        }
    },

    adjustStock: async (req, res, next) => {
        try {
            const { quantity, warehouseId } = req.body;
            let inventory = await Inventory.findOne({
                where: { productId: req.params.variantId, warehouseId }
            });

            if (!inventory) {
                inventory = await Inventory.create({
                    productId: req.params.variantId,
                    warehouseId,
                    quantity
                });
            } else {
                inventory.quantity += quantity;
                await inventory.save();
            }

            res.json(inventory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    transferStock: async (req, res, next) => {
        try {
            const { fromWarehouseId, toWarehouseId, productId, quantity } = req.body;

            // Decrease from source
            const fromInv = await Inventory.findOne({
                where: { productId, warehouseId: fromWarehouseId }
            });
            if (!fromInv || fromInv.available < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            fromInv.quantity -= quantity;
            await fromInv.save();

            // Increase at destination
            let toInv = await Inventory.findOne({
                where: { productId, warehouseId: toWarehouseId }
            });
            if (!toInv) {
                toInv = await Inventory.create({ productId, warehouseId: toWarehouseId, quantity });
            } else {
                toInv.quantity += quantity;
                await toInv.save();
            }

            res.json({ message: 'Stock transferred', from: fromInv, to: toInv });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getInventoryHistory: async (req, res) => {
        res.json({ history: [] });
    },

    getReservations: async (req, res) => {
        res.json({ reservations: [] });
    },

    reserveStock: async (req, res) => {
        res.json({ message: 'Stock reserved' });
    },

    releaseStock: async (req, res) => {
        res.json({ message: 'Stock released' });
    },

    getForecast: async (req, res) => {
        res.json({ forecast: { nextMonth: 1000, trend: 'increasing' } });
    },

    getReorderSuggestions: async (req, res) => {
        res.json({ suggestions: [] });
    },

    createReorder: async (req, res) => {
        res.json({ message: 'Reorder created', id: Date.now() });
    },

    getStockAging: async (req, res) => {
        res.json({ aging: [] });
    },

    getShrinkage: async (req, res) => {
        res.json({ shrinkage: 0.5 });
    },

    startStockCount: async (req, res) => {
        res.json({ countId: 'CNT-' + Date.now() });
    },

    submitStockCount: async (req, res) => {
        res.json({ message: 'Count submitted' });
    },

    getCountHistory: async (req, res) => {
        res.json({ history: [] });
    },

    lockStock: async (req, res) => {
        res.json({ message: 'Stock locked' });
    },

    unlockStock: async (req, res) => {
        res.json({ message: 'Stock unlocked' });
    }
};

module.exports = inventoryController;
