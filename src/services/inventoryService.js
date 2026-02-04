const { Inventory, Product, StockMovement, Warehouse, sequelize } = require('../models');

class InventoryService {
    /**
     * Get inventory for a product
     */
    async getInventory(productId) {
        const inventory = await Inventory.findAll({
            where: { productId },
            include: [
                { model: Product, as: 'product' },
                { model: Warehouse, as: 'warehouse' }
            ]
        });

        const totalQuantity = inventory.reduce((sum, inv) => sum + inv.quantity, 0);

        return {
            productId,
            totalQuantity,
            warehouses: inventory
        };
    }

    /**
     * Adjust stock level
     */
    async adjustStock(productId, warehouseId, quantity, reason) {
        const t = await sequelize.transaction();

        try {
            const inventory = await Inventory.findOne({
                where: { productId, warehouseId },
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!inventory) {
                throw new Error('Inventory record not found');
            }

            const oldQuantity = inventory.quantity;
            inventory.quantity += quantity;

            if (inventory.quantity < 0) {
                throw new Error('Insufficient inventory');
            }

            await inventory.save({ transaction: t });

            // Record stock movement
            await StockMovement.create({
                productId,
                warehouseId,
                type: quantity > 0 ? 'ADJUSTMENT_IN' : 'ADJUSTMENT_OUT',
                quantity: Math.abs(quantity),
                previousQuantity: oldQuantity,
                newQuantity: inventory.quantity,
                reason
            }, { transaction: t });

            await t.commit();
            return inventory;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Transfer stock between warehouses
     */
    async transferStock(productId, fromWarehouseId, toWarehouseId, quantity) {
        const t = await sequelize.transaction();

        try {
            // Decrease from source warehouse
            const fromInventory = await Inventory.findOne({
                where: { productId, warehouseId: fromWarehouseId },
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!fromInventory || fromInventory.quantity < quantity) {
                throw new Error('Insufficient inventory in source warehouse');
            }

            fromInventory.quantity -= quantity;
            await fromInventory.save({ transaction: t });

            // Increase in destination warehouse
            let toInventory = await Inventory.findOne({
                where: { productId, warehouseId: toWarehouseId },
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!toInventory) {
                toInventory = await Inventory.create({
                    productId,
                    warehouseId: toWarehouseId,
                    quantity: 0
                }, { transaction: t });
            }

            toInventory.quantity += quantity;
            await toInventory.save({ transaction: t });

            // Record movements
            await StockMovement.create({
                productId,
                warehouseId: fromWarehouseId,
                type: 'TRANSFER_OUT',
                quantity,
                toWarehouseId,
                previousQuantity: fromInventory.quantity + quantity,
                newQuantity: fromInventory.quantity
            }, { transaction: t });

            await StockMovement.create({
                productId,
                warehouseId: toWarehouseId,
                type: 'TRANSFER_IN',
                quantity,
                fromWarehouseId,
                previousQuantity: toInventory.quantity - quantity,
                newQuantity: toInventory.quantity
            }, { transaction: t });

            await t.commit();

            return {
                from: fromInventory,
                to: toInventory
            };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Reserve inventory for order
     */
    async reserveInventory(productId, quantity, orderId) {
        const t = await sequelize.transaction();

        try {
            const inventory = await Inventory.findOne({
                where: { productId },
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!inventory || inventory.quantity < quantity) {
                throw new Error('Insufficient inventory');
            }

            inventory.quantity -= quantity;
            inventory.reserved = (inventory.reserved || 0) + quantity;
            await inventory.save({ transaction: t });

            await StockMovement.create({
                productId,
                warehouseId: inventory.warehouseId,
                type: 'RESERVED',
                quantity,
                orderId,
                previousQuantity: inventory.quantity + quantity,
                newQuantity: inventory.quantity
            }, { transaction: t });

            await t.commit();
            return inventory;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Get low stock products
     */
    async getLowStockProducts(threshold = 10) {
        const lowStock = await Inventory.findAll({
            where: {
                quantity: { [sequelize.Op.lte]: threshold }
            },
            include: [{ model: Product, as: 'product' }]
        });

        return lowStock;
    }

    /**
     * Get stock movements history
     */
    async getStockMovements(productId, filters = {}) {
        const where = { productId };

        if (filters.type) where.type = filters.type;
        if (filters.warehouseId) where.warehouseId = filters.warehouseId;

        const movements = await StockMovement.findAll({
            where,
            include: [
                { model: Product, as: 'product' },
                { model: Warehouse, as: 'warehouse' }
            ],
            order: [['createdAt', 'DESC']],
            limit: filters.limit || 50
        });

        return movements;
    }

    /**
     * Forecast inventory needs
     */
    async forecastInventory(productId, days = 30) {
        // Get historical sales data
        const movements = await StockMovement.findAll({
            where: {
                productId,
                type: ['SALE', 'ORDER'],
                createdAt: {
                    [sequelize.Op.gte]: new Date(Date.now() - days * 24 * 60 * 60 * 1000)
                }
            }
        });

        const totalSold = movements.reduce((sum, m) => sum + m.quantity, 0);
        const dailyAverage = totalSold / days;
        const forecastedDemand = dailyAverage * 30; // Next 30 days

        const currentInventory = await Inventory.sum('quantity', {
            where: { productId }
        });

        return {
            productId,
            currentStock: currentInventory || 0,
            dailyAverage: Math.round(dailyAverage * 100) / 100,
            forecastedDemand: Math.round(forecastedDemand),
            recommendedReorder: Math.max(0, Math.round(forecastedDemand - currentInventory))
        };
    }
}

module.exports = new InventoryService();
