const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class KBArticle extends Model {
        static associate(models) {
            KBArticle.belongsTo(models.KBCategory, { foreignKey: 'categoryId', as: 'category' });
        }
    }

    KBArticle.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        slug: { type: DataTypes.STRING, unique: true },
        categoryId: DataTypes.UUID,
        isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
        viewCount: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        sequelize,
        modelName: 'KBArticle',
        tableName: 'kb_articles',
        timestamps: true
    });

    return KBArticle;
};
