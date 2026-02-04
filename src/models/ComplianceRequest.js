const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ComplianceRequest extends Model {
        static associate(models) {
            ComplianceRequest.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    ComplianceRequest.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        type: { type: DataTypes.STRING, allowNull: false }, // 'DELETE_DATA', 'EXPORT_DATA', 'RECTIFY'
        status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, processing, completed, rejected
        details: DataTypes.TEXT,
        requestDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        completionDate: DataTypes.DATE,
        adminNotes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'ComplianceRequest',
    });

    return ComplianceRequest;
};
