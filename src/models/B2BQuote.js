const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class B2BQuote extends Model {
        static associate(models) {
            B2BQuote.belongsTo(models.User, { foreignKey: 'userId' });
            B2BQuote.belongsTo(models.B2BAccount, { foreignKey: 'accountId' });
            B2BQuote.hasMany(models.OrderItem, { as: 'items', foreignKey: 'quoteId' }); // Reuse OrderItem or create QuoteItem
        }
    }

    B2BQuote.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.STRING, defaultValue: 'draft' }, // draft, submitted, approved, rejected, converted
        totalAmount: DataTypes.DECIMAL(10, 2),
        validUntil: DataTypes.DATE,
        notes: DataTypes.TEXT,
        adminNotes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'B2BQuote',
        tableName: 'b2b_quotes'
    });

    return B2BQuote;
};
