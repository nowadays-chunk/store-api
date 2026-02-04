const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Warehouse extends Model {
        static associate(models) {
            Warehouse.hasMany(models.Inventory, { foreignKey: 'warehouseId', as: 'inventory' });
            Warehouse.hasMany(models.StockMovement, { foreignKey: 'warehouseId', as: 'movements' });
        }
    }

    Warehouse.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, unique: true },
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        contactPerson: DataTypes.STRING,
        contactEmail: DataTypes.STRING,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Warehouse',
    });

    return Warehouse;
};
