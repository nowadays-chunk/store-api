const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Workflow extends Model {
        static associate(models) {
            Workflow.hasMany(models.WorkflowState, { foreignKey: 'workflowId', as: 'states' });
            Workflow.hasMany(models.WorkflowTransition, { foreignKey: 'workflowId', as: 'transitions' });
        }
    }

    Workflow.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        entityType: { type: DataTypes.STRING, allowNull: false }, // e.g. 'ORDER', 'PRODUCT'
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Workflow',
    });

    return Workflow;
};
