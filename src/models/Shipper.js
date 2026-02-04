const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipper = sequelize.define('Shipper', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    apiKey: {
        type: DataTypes.STRING
    },
    apiSecret: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    services: {
        type: DataTypes.JSON
    },
    config: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'shippers',
    timestamps: true
});

module.exports = Shipper;
