const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EntityField extends Model {
        static associate(models) {
            EntityField.belongsTo(models.EntityDefinition, { foreignKey: 'entityId' });
        }
    }

    EntityField.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        key: { type: DataTypes.STRING, allowNull: false }, // database column name
        type: { type: DataTypes.STRING, allowNull: false }, // text, number, date, boolean, relation
        isRequired: { type: DataTypes.BOOLEAN, defaultValue: false },
        defaultValue: DataTypes.STRING,
        options: DataTypes.JSON, // For select/enum types
        order: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        sequelize,
        modelName: 'EntityField',
        tableName: 'entity_fields'
    });

    return EntityField;
};
