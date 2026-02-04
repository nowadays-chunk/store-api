const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            OrderItem.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
            // We also store snapshot data to persist history if product changes
        }
    }

    OrderItem.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        productName: DataTypes.STRING, // Snapshot
        sku: DataTypes.STRING,        // Snapshot
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Price at purchase
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, {
        sequelize,
        modelName: 'OrderItem',
    });

    return OrderItem;
};
