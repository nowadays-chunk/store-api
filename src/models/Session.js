const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        static associate(models) {
            Session.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }

    Session.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        device: DataTypes.STRING,
        ipAddress: DataTypes.STRING,
        userAgent: DataTypes.STRING,
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        expiresAt: DataTypes.DATE,
        isValid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Session',
    });

    return Session;
};
