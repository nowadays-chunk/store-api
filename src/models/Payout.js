const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payout extends Model {
        static associate(models) {
            Payout.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
        }
    }

    Payout.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        amount: DataTypes.DECIMAL(10, 2),
        status: {
            type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'),
            defaultValue: 'PENDING'
        },
        transactionId: DataTypes.STRING,
        payoutDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Payout',
    });

    return Payout;
};
