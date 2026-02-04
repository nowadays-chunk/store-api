const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM('order', 'promotion', 'system', 'product'),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: DataTypes.TEXT,
    data: DataTypes.JSON,
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    readAt: DataTypes.DATE
}, {
    timestamps: true
});

module.exports = Notification;
