const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ReportExecution extends Model {
        static associate(models) {
            ReportExecution.belongsTo(models.Report, { foreignKey: 'reportId', as: 'report' });
        }
    }

    ReportExecution.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED'), defaultValue: 'PENDING' },
        resultUrl: DataTypes.STRING, // Path to file if exported
        executionTimeMs: DataTypes.INTEGER,
        executedBy: DataTypes.UUID // userId
    }, {
        sequelize,
        modelName: 'ReportExecution',
        tableName: 'report_executions'
    });

    return ReportExecution;
};
