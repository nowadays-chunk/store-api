const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        static associate(models) {
            Collection.belongsToMany(models.Product, { through: 'ProductCollections', foreignKey: 'collectionId', as: 'products' });
        }
    }

    Collection.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Collection',
    });

    return Collection;
};
