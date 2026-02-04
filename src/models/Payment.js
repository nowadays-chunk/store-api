const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }

    Payment.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currency: { type: DataTypes.STRING, defaultValue: 'USD' },
        provider: DataTypes.STRING, // e.g., 'stripe', 'paypal'
        status: {
            type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
            defaultValue: 'PENDING'
        },
        transactionId: DataTypes.STRING,
        paymentMethodJson: DataTypes.JSON // Details about card/method
    }, {
        sequelize,
        modelName: 'Payment',
    });

    return Payment;
};
