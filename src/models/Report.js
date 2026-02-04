const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            Report.hasMany(models.ReportExecution, { foreignKey: 'reportId', as: 'executions' });
        }
    }

    Report.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        query: DataTypes.TEXT, // SQL or JSON query definition
        parameters: DataTypes.JSON, // Input params schema
        type: { type: DataTypes.ENUM('TABLE', 'CHART', 'PIVOT'), defaultValue: 'TABLE' },
        createdBy: DataTypes.UUID // userId
    }, {
        sequelize,
        modelName: 'Report',
        tableName: 'reports'
    });

    return Report;
};
