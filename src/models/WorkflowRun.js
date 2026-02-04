const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkflowRun extends Model {
        static associate(models) {
            WorkflowRun.belongsTo(models.Workflow, { foreignKey: 'workflowId', as: 'workflow' });
            WorkflowRun.hasMany(models.WorkflowLog, { foreignKey: 'runId', as: 'logs' });
        }
    }

    WorkflowRun.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        workflowId: { type: DataTypes.UUID, allowNull: false },
        triggeredBy: { type: DataTypes.STRING, defaultValue: 'MANUAL' }, // MANUAL, EVENT, SCHEDULE
        userId: DataTypes.UUID,
        status: { type: DataTypes.STRING, defaultValue: 'PENDING' }, // PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
        inputData: DataTypes.JSON,
        outputData: DataTypes.JSON,
        startedAt: DataTypes.DATE,
        completedAt: DataTypes.DATE,
        duration: DataTypes.INTEGER // in milliseconds
    }, {
        sequelize,
        modelName: 'WorkflowRun',
        tableName: 'WorkflowRuns'
    });

    return WorkflowRun;
};
