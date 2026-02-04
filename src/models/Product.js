const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    shortDescription: {
        type: DataTypes.STRING(500)
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    compareAtPrice: {
        type: DataTypes.DECIMAL(10, 2)
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2)
    },
    sku: {
        type: DataTypes.STRING,
        unique: true
    },
    barcode: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categoryId: {
        type: DataTypes.UUID,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    brandId: {
        type: DataTypes.UUID,
        references: {
            model: 'Brands',
            key: 'id'
        }
    },
    vendorId: {
        type: DataTypes.UUID,
        references: {
            model: 'Vendors',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('draft', 'active', 'archived'),
        defaultValue: 'draft'
    },
    images: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2)
    },
    weightUnit: {
        type: DataTypes.ENUM('kg', 'g', 'lb', 'oz'),
        defaultValue: 'kg'
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    seoTitle: DataTypes.STRING,
    seoDescription: DataTypes.TEXT,
    seoKeywords: DataTypes.STRING
}, {
    timestamps: true
});

Product.associate = (models) => {
    Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
    });
    Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as: 'brand'
    });
    Product.hasMany(models.ProductVariant, { foreignKey: 'productId', as: 'variants' });
    Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'productImages' });
    Product.hasMany(models.Inventory, { foreignKey: 'productId', as: 'inventory' });
    Product.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
    Product.belongsToMany(models.Collection, { through: 'ProductCollections', foreignKey: 'productId', as: 'collections' });
};

module.exports = Product;
