const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.Project, { foreignKey: 'projectId' });
            Task.belongsTo(models.User, { as: 'assignee', foreignKey: 'assigneeId' });
            Task.belongsTo(models.User, { as: 'reporter', foreignKey: 'reporterId' });
            // Self-referencing for subtasks or dependencies could be added
        }
    }

    Task.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        status: { type: DataTypes.STRING, defaultValue: 'todo' }, // todo, in_progress, review, done
        priority: { type: DataTypes.STRING, defaultValue: 'medium' }, // low, medium, high, critical
        dueDate: DataTypes.DATE,
        comments: DataTypes.JSON, // Array of simple comments for now
        dependencies: DataTypes.JSON // Array of task IDs
    }, {
        sequelize,
        modelName: 'Task',
    });

    return Task;
};
