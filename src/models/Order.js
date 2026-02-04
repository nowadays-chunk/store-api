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
    timestamps: true
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    productName: DataTypes.STRING
}, {
    timestamps: true
});

module.exports = { Order, OrderItem };
