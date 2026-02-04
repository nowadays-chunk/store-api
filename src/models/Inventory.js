const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    variantId: {
        type: DataTypes.UUID,
        references: {
            model: 'ProductVariants',
            key: 'id'
        }
    },
    warehouseId: {
        type: DataTypes.UUID,
        references: {
            model: 'Warehouses',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    reserved: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sku: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'inventory',
    timestamps: true
});

Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    Inventory.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
    Inventory.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
};

module.exports = Inventory;
