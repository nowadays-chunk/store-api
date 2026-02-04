const { Warehouse, Inventory, sequelize } = require('../models');

class WarehouseService {
    /**
     * Get all warehouses
     */
    async getAllWarehouses() {
        const warehouses = await Warehouse.findAll({
            order: [['name', 'ASC']]
        });

        return warehouses;
    }

    /**
     * Get warehouse by ID
     */
    async getWarehouseById(warehouseId) {
        const warehouse = await Warehouse.findByPk(warehouseId, {
            include: [{ model: Inventory, as: 'inventory' }]
        });

        if (!warehouse) throw new Error('Warehouse not found');
        return warehouse;
    }

    /**
     * Create warehouse
     */
    async createWarehouse(warehouseData) {
        const warehouse = await Warehouse.create(warehouseData);
        return warehouse;
    }

    /**
     * Update warehouse
     */
    async updateWarehouse(warehouseId, updates) {
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) throw new Error('Warehouse not found');

        await warehouse.update(updates);
        return warehouse;
    }

    /**
     * Delete warehouse
     */
    async deleteWarehouse(warehouseId) {
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) throw new Error('Warehouse not found');

        // Check if warehouse has inventory
        const inventoryCount = await Inventory.count({ where: { warehouseId } });
        if (inventoryCount > 0) {
            throw new Error(`Cannot delete warehouse with ${inventoryCount} inventory items`);
        }

        await warehouse.destroy();
        return { message: 'Warehouse deleted' };
    }

    /**
     * Get warehouse inventory
     */
    async getWarehouseInventory(warehouseId) {
        const inventory = await Inventory.findAll({
            where: { warehouseId },
            include: [{ model: Product, as: 'product' }]
        });

        return inventory;
    }

    /**
     * Get warehouse capacity
     */
    async getWarehouseCapacity(warehouseId) {
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) throw new Error('Warehouse not found');

        const totalItems = await Inventory.sum('quantity', {
            where: { warehouseId }
        });

        return {
            warehouseId,
            name: warehouse.name,
            capacity: warehouse.capacity || 0,
            currentStock: totalItems || 0,
            availableSpace: (warehouse.capacity || 0) - (totalItems || 0),
            utilizationPercentage: warehouse.capacity ? ((totalItems || 0) / warehouse.capacity) * 100 : 0
        };
    }
}

module.exports = new WarehouseService();
