const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BulkOperation extends Model {
        static associate(models) {
            BulkOperation.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    BulkOperation.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        type: { type: DataTypes.STRING, allowNull: false }, // IMPORT_PRODUCTS, BULK_UPDATE, EXPORT
        status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, processing, completed, failed
        totalItems: { type: DataTypes.INTEGER, defaultValue: 0 },
        processedItems: { type: DataTypes.INTEGER, defaultValue: 0 },
        failedItems: { type: DataTypes.INTEGER, defaultValue: 0 },
        fileUrl: DataTypes.STRING, // For imports/exports
        resultUrl: DataTypes.STRING, // Error logs or export file
        config: DataTypes.JSON, // Mapping options, filters
        startedAt: DataTypes.DATE,
        completedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'BulkOperation',
    });

    return BulkOperation;
};
