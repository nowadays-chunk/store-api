const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductImage extends Model {
        static associate(models) {
            ProductImage.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        }
    }

    ProductImage.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        url: { type: DataTypes.STRING, allowNull: false },
        altText: DataTypes.STRING,
        isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
        sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        sequelize,
        modelName: 'ProductImage',
    });

    return ProductImage;
};
