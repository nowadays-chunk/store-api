const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class KBCategory extends Model {
        static associate(models) {
            KBCategory.hasMany(models.KBArticle, { foreignKey: 'categoryId', as: 'articles' });
        }
    }

    KBCategory.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        icon: DataTypes.STRING,
        slug: { type: DataTypes.STRING, unique: true }
    }, {
        sequelize,
        modelName: 'KBCategory',
        tableName: 'kb_categories',
        timestamps: true
    });

    return KBCategory;
};
