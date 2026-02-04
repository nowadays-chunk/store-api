const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Budget extends Model {
        static associate(models) {
            Budget.belongsTo(models.B2BAccount, { foreignKey: 'accountId' });
        }
    }

    Budget.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: DataTypes.STRING,
        totalAmount: DataTypes.DECIMAL(10, 2),
        spentAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
        period: { type: DataTypes.STRING, defaultValue: 'monthly' }, // monthly, quarterly, yearly
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Budget',
        tableName: 'budgets'
    });

    return Budget;
};
