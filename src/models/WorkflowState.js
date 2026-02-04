const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkflowState = sequelize.define('WorkflowState', {
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50)
    },
    config: {
        type: DataTypes.JSON
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true,
    tableName: 'WorkflowStates'
});

WorkflowState.associate = (models) => {
    WorkflowState.belongsTo(models.Workflow, { foreignKey: 'workflowId', as: 'workflow' });
};

module.exports = WorkflowState;
