const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StockMovement extends Model {
        static associate(models) {
            StockMovement.belongsTo(models.ProductVariant, { foreignKey: 'variantId', as: 'variant' });
            StockMovement.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });
            StockMovement.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // Who made the move
        }
    }

    StockMovement.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        type: {
            type: DataTypes.ENUM('IN', 'OUT', 'ADJUSTMENT', 'TRANSFER', 'RETURN'),
            allowNull: false
        },
        reason: DataTypes.STRING,
        referenceId: DataTypes.STRING, // OrderID or TransferID
        notes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'StockMovement',
    });

    return StockMovement;
};
