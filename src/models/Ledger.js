const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ledger extends Model {
        static associate(models) {
            // Linked to order, payment, refund, payout
        }
    }

    Ledger.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        account: { type: DataTypes.STRING, allowNull: false }, // 'ACCOUNTS_RECEIVABLE', 'REVENUE', etc.
        type: { type: DataTypes.ENUM('DEBIT', 'CREDIT'), allowNull: false },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: DataTypes.STRING,
        referenceId: DataTypes.STRING,
        referenceType: DataTypes.STRING // 'ORDER', 'PAYOUT'
    }, {
        sequelize,
        modelName: 'Ledger',
    });

    return Ledger;
};
