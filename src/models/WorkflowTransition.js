const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkflowTransition = sequelize.define('WorkflowTransition', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    workflowId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Workflows',
            key: 'id'
        }
    },
    fromStateId: {
        type: DataTypes.UUID,
        references: {
            model: 'WorkflowStates',
            key: 'id'
        }
    },
    toStateId: {
        type: DataTypes.UUID,
        references: {
            model: 'WorkflowStates',
            key: 'id'
        }
    },
    condition: {
        type: DataTypes.JSON
    },
    action: {
        type: DataTypes.JSON
    }
}, {
    timestamps: true,
    tableName: 'WorkflowTransitions'
});

WorkflowTransition.associate = (models) => {
    WorkflowTransition.belongsTo(models.Workflow, { foreignKey: 'workflowId', as: 'workflow' });
    WorkflowTransition.belongsTo(models.WorkflowState, { foreignKey: 'fromStateId', as: 'fromState' });
    WorkflowTransition.belongsTo(models.WorkflowState, { foreignKey: 'toStateId', as: 'toState' });
};

module.exports = WorkflowTransition;
