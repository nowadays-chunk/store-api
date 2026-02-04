const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TicketResponse extends Model {
        static associate(models) {
            TicketResponse.belongsTo(models.SupportTicket, { foreignKey: 'ticketId', as: 'ticket' });
            TicketResponse.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }

    TicketResponse.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        ticketId: { type: DataTypes.UUID, allowNull: false },
        userId: { type: DataTypes.UUID, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        isInternal: { type: DataTypes.BOOLEAN, defaultValue: false },
        attachments: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'TicketResponse',
        tableName: 'ticket_responses',
        timestamps: true
    });

    return TicketResponse;
};
