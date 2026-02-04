const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SLARule extends Model { }

    SLARule.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        priority: {
            type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
            allowNull: false
        },
        responseTimeHours: DataTypes.INTEGER,
        resolutionTimeHours: DataTypes.INTEGER,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'SLARule',
        tableName: 'sla_rules',
        timestamps: true
    });

    return SLARule;
};
