const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RecordVersion extends Model {
        static associate(models) {
            RecordVersion.belongsTo(models.CustomRecord, { foreignKey: 'recordId' });
        }
    }

    RecordVersion.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        recordId: { type: DataTypes.UUID, allowNull: false },
        versionNumber: { type: DataTypes.INTEGER, allowNull: false },
        data: DataTypes.JSON,
        changedBy: DataTypes.STRING,
        changeReason: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RecordVersion',
        tableName: 'record_versions'
    });

    return RecordVersion;
};
