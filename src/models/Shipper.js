const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Shipper extends Model {
        static associate(models) {
            Shipper.hasMany(models.Shipment, { foreignKey: 'shipperId', as: 'shipments' });
        }
    }

    Shipper.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        logo: DataTypes.STRING,
        website: DataTypes.STRING,
        contactPhone: DataTypes.STRING,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Shipper',
    });

    return Shipper;
};
