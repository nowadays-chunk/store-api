const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkflowTransition extends Model {
        static associate(models) {
            WorkflowTransition.belongsTo(models.Workflow, { foreignKey: 'workflowId', as: 'workflow' });
            WorkflowTransition.belongsTo(models.WorkflowState, { foreignKey: 'fromStateId', as: 'fromState' });
            WorkflowTransition.belongsTo(models.WorkflowState, { foreignKey: 'toStateId', as: 'toState' });
        }
    }

    WorkflowTransition.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        trigger: DataTypes.STRING, // e.g. 'APPROVE_BUTTON_CLICK'
        conditions: DataTypes.JSON // Logic checks
    }, {
        sequelize,
        modelName: 'WorkflowTransition',
    });

    return WorkflowTransition;
};
