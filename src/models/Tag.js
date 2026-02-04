const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.belongsToMany(models.Product, { through: 'ProductTags', foreignKey: 'tagId', as: 'products' });
        }
    }

    Tag.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        sequelize,
        modelName: 'Tag',
    });

    return Tag;
};
