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
    sessionId: DataTypes.STRING,
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
    tableName: 'carts',
    timestamps: true
});

Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items' });
    Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Cart;
