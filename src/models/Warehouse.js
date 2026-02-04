const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    address: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    contactPerson: {
        type: DataTypes.STRING
    },
    contactEmail: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'warehouses',
    timestamps: true
});

Warehouse.associate = (models) => {
    Warehouse.hasMany(models.Inventory, { foreignKey: 'warehouseId', as: 'inventory' });
    Warehouse.hasMany(models.StockMovement, { foreignKey: 'warehouseId', as: 'movements' });
};

module.exports = Warehouse;
