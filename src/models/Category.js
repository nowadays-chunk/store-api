const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
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
    description: DataTypes.TEXT,
    parentId: {
        type: DataTypes.UUID,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    image: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

Category.associate = (models) => {
    Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
    });
    Category.belongsTo(models.Category, {
        foreignKey: 'parentId',
        as: 'parent'
    });
    Category.hasMany(models.Category, {
        foreignKey: 'parentId',
        as: 'children'
    });
};

module.exports = Category;
