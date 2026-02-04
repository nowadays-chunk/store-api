const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AnalyticsEvent extends Model {
        static associate(models) {
            AnalyticsEvent.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    AnalyticsEvent.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        eventName: { type: DataTypes.STRING, allowNull: false }, // VIEW_PRODUCT, ADD_TO_CART
        category: DataTypes.STRING, // ecommerce, engagement
        properties: DataTypes.JSON, // { productId: 1, value: 100 }
        sessionId: DataTypes.STRING,
        deviceInfo: DataTypes.JSON // Browser, OS, DB
    }, {
        sequelize,
        modelName: 'AnalyticsEvent',
        tableName: 'analytics_events'
    });

    return AnalyticsEvent;
};
