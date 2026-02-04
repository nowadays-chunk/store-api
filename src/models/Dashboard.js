const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Dashboard extends Model {
        static associate(models) {
            // Dashboard has many Widgets (which might point to Reports)
        }
    }

    Dashboard.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        layout: DataTypes.JSON, // Grid layout config
        isPublic: { type: DataTypes.BOOLEAN, defaultValue: false },
        createdBy: DataTypes.UUID // userId
    }, {
        sequelize,
        modelName: 'Dashboard',
        tableName: 'dashboards'
    });

    return Dashboard;
};
