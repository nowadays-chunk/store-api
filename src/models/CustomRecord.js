const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CustomRecord extends Model {
        static associate(models) {
            // Can handle dynamic relations
        }
    }

    CustomRecord.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        entityType: { type: DataTypes.STRING, allowNull: false }, // Corresponds to EntityDefinition.name
        data: DataTypes.JSON, // The dynamic data
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
        version: { type: DataTypes.INTEGER, defaultValue: 1 },
        isLocked: { type: DataTypes.BOOLEAN, defaultValue: false },
        lockedBy: DataTypes.STRING,
        isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        sequelize,
        modelName: 'CustomRecord',
        tableName: 'custom_records'
    });

    return CustomRecord;
};
