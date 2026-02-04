const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkflowLog extends Model {
        static associate(models) {
            WorkflowLog.belongsTo(models.WorkflowRun, { foreignKey: 'runId', as: 'run' });
        }
    }

    WorkflowLog.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        runId: { type: DataTypes.UUID, allowNull: false },
        level: { type: DataTypes.STRING, defaultValue: 'INFO' }, // INFO, WARN, ERROR, DEBUG
        message: { type: DataTypes.TEXT, allowNull: false },
        details: DataTypes.JSON,
        stepName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'WorkflowLog',
        tableName: 'WorkflowLogs'
    });

    return WorkflowLog;
};
