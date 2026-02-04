const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        static associate(models) {
            Invoice.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            Invoice.belongsTo(models.User, { foreignKey: 'billToId', as: 'billTo' });
        }
    }

    Invoice.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        invoiceNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
        issueDate: DataTypes.DATE,
        dueDate: DataTypes.DATE,
        totalAmount: DataTypes.DECIMAL(10, 2),
        status: {
            type: DataTypes.ENUM('DRAFT', 'ISSUED', 'PAID', 'VOID', 'OVERDUE'),
            defaultValue: 'DRAFT'
        },
        itemsSnapshot: DataTypes.JSON // Store items at time of invoice
    }, {
        sequelize,
        modelName: 'Invoice',
    });

    return Invoice;
};
