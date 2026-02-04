const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductVariant = sequelize.define('ProductVariant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        unique: true
    },
    barcode: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    compareAtPrice: DataTypes.DECIMAL(10, 2),
    cost: DataTypes.DECIMAL(10, 2),
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    weight: DataTypes.DECIMAL(10, 2),
    weightUnit: DataTypes.STRING,
    dimensions: DataTypes.JSON,
    options: DataTypes.JSON, // e.g., { size: 'L', color: 'Red' }
    image: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

ProductVariant.associate = (models) => {
    ProductVariant.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    ProductVariant.hasMany(models.Inventory, { foreignKey: 'variantId', as: 'inventory' });
};

module.exports = ProductVariant;
