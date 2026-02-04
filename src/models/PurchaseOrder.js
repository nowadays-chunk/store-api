const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PurchaseOrder extends Model {
        static associate(models) {
            PurchaseOrder.belongsTo(models.B2BAccount, { foreignKey: 'accountId' });
            PurchaseOrder.belongsTo(models.Order, { foreignKey: 'associatedOrderId' });
        }
    }

    PurchaseOrder.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        poNumber: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, approved, rejected, completed
        amount: DataTypes.DECIMAL(10, 2),
        fileUrl: DataTypes.STRING,
        notes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'PurchaseOrder',
        tableName: 'purchase_orders'
    });

    return PurchaseOrder;
};
