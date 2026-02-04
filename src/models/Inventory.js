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
    available: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.quantity - this.reserved;
        }
    }
}, {
    timestamps: true
});

const Warehouse = sequelize.define('Warehouse', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        unique: true
    },
    address: DataTypes.JSON,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = { Inventory, Warehouse };
