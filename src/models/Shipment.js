const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipment = sequelize.define('Shipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    carrier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING
    },
    trackingNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    labelUrl: {
        type: DataTypes.STRING
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2)
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2)
    },
    status: {
        type: DataTypes.ENUM('CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'CANCELLED'),
        defaultValue: 'CREATED'
    },
    shippingAddress: {
        type: DataTypes.JSON
    },
    pickupScheduledAt: {
        type: DataTypes.DATE
    },
    shippedAt: {
        type: DataTypes.DATE
    },
    deliveredAt: {
        type: DataTypes.DATE
    },
    cancelledAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'shipments',
    timestamps: true
});

module.exports = Shipment;
