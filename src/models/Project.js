const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            Project.hasMany(models.Task, { as: 'tasks', foreignKey: 'projectId' });
            Project.belongsTo(models.User, { as: 'manager', foreignKey: 'managerId' });
        }
    }

    Project.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        status: { type: DataTypes.STRING, defaultValue: 'planning' }, // planning, active, on_hold, completed
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        budget: DataTypes.DECIMAL(10, 2),
        milestones: DataTypes.JSON, // Array of { name, date, status }
        risks: DataTypes.JSON // Array of { description, impact, probability }
    }, {
        sequelize,
        modelName: 'Project',
    });

    return Project;
};
