const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Dataset extends Model {
        static associate(models) {
            // Could belong to specific integrations or just be standalone definitions
        }
    }

    Dataset.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        sourceType: { type: DataTypes.STRING, allowNull: false }, // SQL, API, CSV
        config: DataTypes.JSON, // Connection string or query
        schema: DataTypes.JSON, // Field definitions
        refreshRate: DataTypes.STRING, // 'hourly', 'daily'
        lastRefreshedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Dataset',
        tableName: 'datasets'
    });

    return Dataset;
};
