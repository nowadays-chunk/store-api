const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Page extends Model {
        static associate(models) {
            // Could associate with Tags or Categories
        }
    }

    Page.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true },
        content: DataTypes.TEXT('long'), // HTML or JSON
        metaTitle: DataTypes.STRING,
        metaDescription: DataTypes.TEXT,
        isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
        publishedAt: DataTypes.DATE,
        template: { type: DataTypes.STRING, defaultValue: 'default' }
    }, {
        sequelize,
        modelName: 'Page',
    });

    return Page;
};
