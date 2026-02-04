const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending'
    },
    subtotal: DataTypes.DECIMAL(10, 2),
    tax: DataTypes.DECIMAL(10, 2),
    shipping: DataTypes.DECIMAL(10, 2),
    discount: DataTypes.DECIMAL(10, 2),
    total: DataTypes.DECIMAL(10, 2),
    shippingAddress: DataTypes.JSON,
    billingAddress: DataTypes.JSON,
    paymentMethod: DataTypes.STRING,
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
        defaultValue: 'pending'
    },
    trackingNumber: DataTypes.STRING,
    notes: DataTypes.TEXT
}, {
    tableName: 'orders',
    timestamps: true
});

Order.associate = (models) => {
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Order.hasOne(models.Payment, { foreignKey: 'orderId', as: 'payment' });
    Order.hasOne(models.Shipment, { foreignKey: 'orderId', as: 'shipment' });
};

module.exports = Order;
