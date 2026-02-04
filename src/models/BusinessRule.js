const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BusinessRule extends Model {
        static associate(models) {
            // Linked to entity type
        }
    }

    BusinessRule.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        entityType: { type: DataTypes.STRING, allowNull: false },
        triggerEvent: { type: DataTypes.STRING, allowNull: false }, // 'BEFORE_CREATE', 'AFTER_UPDATE'
        conditions: DataTypes.JSON, // Logic
        actions: DataTypes.JSON, // What to do
        priority: { type: DataTypes.INTEGER, defaultValue: 0 },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'BusinessRule',
    });

    return BusinessRule;
};
