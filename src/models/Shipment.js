const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Shipment extends Model {
        static associate(models) {
            Shipment.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            Shipment.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
            Shipment.belongsTo(models.Shipper, { foreignKey: 'shipperId', as: 'shipper' });
        }
    }

    Shipment.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        trackingNumber: DataTypes.STRING,
        carrier: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'FAILED'),
            defaultValue: 'PENDING'
        },
        shippedDate: DataTypes.DATE,
        estimatedDeliveryDate: DataTypes.DATE,
        labelUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Shipment',
    });

    return Shipment;
};
