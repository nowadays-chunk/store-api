const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    sessionId: DataTypes.STRING, // For guest carts
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    tax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    couponCode: DataTypes.STRING,
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
}, {
    timestamps: true
});

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cartId: {
        type: DataTypes.UUID,
        references: {
            model: 'Carts',
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
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price: DataTypes.DECIMAL(10, 2)
}, {
    timestamps: true
});

module.exports = { Cart, CartItem };
