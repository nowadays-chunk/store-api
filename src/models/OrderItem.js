const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    quoteId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'b2b_quotes',
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
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: DataTypes.STRING,
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: true
});

OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order', onDelete: 'CASCADE' });
    OrderItem.belongsTo(models.B2BQuote, { foreignKey: 'quoteId', as: 'quote' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    OrderItem.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
};

module.exports = OrderItem;
