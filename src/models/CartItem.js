const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
            CartItem.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
        }
    }

    CartItem.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
    }, {
        sequelize,
        modelName: 'CartItem',
    });

    return CartItem;
};
