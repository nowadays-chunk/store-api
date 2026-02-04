const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SupportTicket extends Model {
        static associate(models) {
            SupportTicket.belongsTo(models.User, { foreignKey: 'userId', as: 'customer' });
            SupportTicket.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'agent' });
            SupportTicket.hasMany(models.TicketResponse, { foreignKey: 'ticketId', as: 'responses' });
        }
    }

    SupportTicket.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        subject: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        status: {
            type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED'),
            defaultValue: 'OPEN'
        },
        priority: {
            type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
            defaultValue: 'MEDIUM'
        },
        category: DataTypes.STRING,
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        assignedTo: DataTypes.UUID,
        closedAt: DataTypes.DATE,
        metadata: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'SupportTicket',
        tableName: 'support_tickets',
        timestamps: true
    });

    return SupportTicket;
};
