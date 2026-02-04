const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PriceList extends Model {
        static associate(models) {
            PriceList.belongsTo(models.B2BAccount, { foreignKey: 'accountId' });
        }
    }

    PriceList.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        currency: { type: DataTypes.STRING, defaultValue: 'USD' },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        rules: DataTypes.JSON // { productId: { price, discount } }
    }, {
        sequelize,
        modelName: 'PriceList',
        tableName: 'price_lists'
    });

    return PriceList;
};
