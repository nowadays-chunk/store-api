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

module.exports = Product;
