const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipper = sequelize.define('Shipper', {
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
        unique: true,
        allowNull: false
    },
    apiKey: {
        type: DataTypes.STRING
    },
    apiSecret: {
        type: DataTypes.STRING
    },
    trackingUrl: {
        type: DataTypes.STRING(500)
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

Shipper.associate = (models) => {
    Shipper.hasMany(models.Shipment, { foreignKey: 'shipperId', as: 'shipments' });
};

module.exports = Shipper;
