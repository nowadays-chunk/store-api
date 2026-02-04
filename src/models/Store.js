const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        static associate(models) {
            Store.belongsTo(models.Channel, { foreignKey: 'channelId' });
            Store.belongsTo(models.Address, { foreignKey: 'addressId' });
        }
    }

    Store.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, unique: true },
        type: { type: DataTypes.STRING, defaultValue: 'retail' }, // retail, warehouse, popup
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        openingHours: DataTypes.JSON,
        contactPhone: DataTypes.STRING,
        managerName: DataTypes.STRING,
        geoLat: DataTypes.FLOAT,
        geoLng: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Store',
    });

    return Store;
};
