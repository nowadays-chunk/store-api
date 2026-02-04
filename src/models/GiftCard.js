const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GiftCard extends Model {
        static associate(models) {
            // Optional user association if bound to a specific user
            GiftCard.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    GiftCard.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        code: { type: DataTypes.STRING, unique: true, allowNull: false },
        initialBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currentBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currency: { type: DataTypes.STRING, defaultValue: 'USD' },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        expiryDate: DataTypes.DATE,
        isDigital: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'GiftCard',
    });

    return GiftCard;
};
