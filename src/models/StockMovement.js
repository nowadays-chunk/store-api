const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StockMovement = sequelize.define('StockMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    warehouseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'warehouses',
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
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    fromWarehouseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'warehouses',
            key: 'id'
        }
    },
    toWarehouseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'warehouses',
            key: 'id'
        }
    },
    reason: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'stock_movements',
    timestamps: true
});

module.exports = StockMovement;
