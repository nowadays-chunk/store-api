const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        defaultValue: 'percentage'
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    minPurchase: DataTypes.DECIMAL(10, 2),
    maxDiscount: DataTypes.DECIMAL(10, 2),
    usageLimit: DataTypes.INTEGER,
    usageCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    startsAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = Coupon;
