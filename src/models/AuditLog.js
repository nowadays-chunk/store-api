const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AuditLog extends Model {
        static associate(models) {
            AuditLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }

    AuditLog.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        action: { type: DataTypes.STRING, allowNull: false }, // CREATE, UPDATE, DELETE, LOGIN
        entityType: DataTypes.STRING, // Product, Order, etc.
        entityId: DataTypes.STRING,
        changes: DataTypes.JSON, // { before, after }
        ipAddress: DataTypes.STRING,
        userAgent: DataTypes.STRING,
        status: { type: DataTypes.STRING, defaultValue: 'success' } // success, failure
    }, {
        sequelize,
        modelName: 'AuditLog',
        tableName: 'audit_logs'
    });

    return AuditLog;
};
