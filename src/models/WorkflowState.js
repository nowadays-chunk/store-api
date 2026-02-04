const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkflowState extends Model {
        static associate(models) {
            WorkflowState.belongsTo(models.Workflow, { foreignKey: 'workflowId', as: 'workflow' });
        }
    }

    WorkflowState.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        isInitial: { type: DataTypes.BOOLEAN, defaultValue: false },
        isFinal: { type: DataTypes.BOOLEAN, defaultValue: false },
        metadata: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'WorkflowState',
    });

    return WorkflowState;
};
