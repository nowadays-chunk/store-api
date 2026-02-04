const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Workflow = sequelize.define('Workflow', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    trigger: {
        type: DataTypes.STRING(100),
        field: 'trigger' // Explicitly map to backtick-escaped column
    },
    config: {
        type: DataTypes.JSON
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'Workflows'
});

Workflow.associate = (models) => {
    Workflow.hasMany(models.WorkflowState, { foreignKey: 'workflowId', as: 'states' });
    Workflow.hasMany(models.WorkflowTransition, { foreignKey: 'workflowId', as: 'transitions' });
};

module.exports = Workflow;
