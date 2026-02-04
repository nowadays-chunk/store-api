const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Promotion extends Model {
        static associate(models) {
            // Complex logic for promotions would go here (rules, etc.)
        }
    }

    Promotion.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        rules: DataTypes.JSON // Flexible JSON for promotion rules
    }, {
        sequelize,
        modelName: 'Promotion',
    });

    return Promotion;
};
