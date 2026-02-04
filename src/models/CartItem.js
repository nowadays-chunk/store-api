const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Carts',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    variantId: {
        type: DataTypes.UUID,
        references: {
            model: 'ProductVariants',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'cart_items',
    timestamps: true
});

CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
    CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    CartItem.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
};

module.exports = CartItem;
