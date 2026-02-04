const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EntityDefinition extends Model {
        static associate(models) {
            EntityDefinition.hasMany(models.EntityField, { as: 'fields', foreignKey: 'entityId' });
        }
    }

    EntityDefinition.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: DataTypes.TEXT,
        isSystem: { type: DataTypes.BOOLEAN, defaultValue: false }, // Cannot be deleted
        isPublished: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        sequelize,
        modelName: 'EntityDefinition',
        tableName: 'entity_definitions'
    });

    return EntityDefinition;
};
