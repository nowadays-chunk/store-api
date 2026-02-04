const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StockMovement = sequelize.define('StockMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
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
    type: {
        type: DataTypes.ENUM(
            'PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT',
            'TRANSFER_IN', 'TRANSFER_OUT', 'RESERVED', 'RELEASED', 'DAMAGED', 'LOST'
        ),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    previousQuantity: {
        type: DataTypes.INTEGER
    },
    newQuantity: {
        type: DataTypes.INTEGER
    },
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    reason: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'stock_movements',
    timestamps: true
});

StockMovement.associate = (models) => {
    StockMovement.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    StockMovement.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
    StockMovement.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
    StockMovement.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    StockMovement.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = StockMovement;
