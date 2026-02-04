const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD'
    },
    method: {
        type: DataTypes.ENUM('credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'AUTHORIZED', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'VOIDED'),
        defaultValue: 'PENDING'
    },
    transactionId: {
        type: DataTypes.STRING,
        unique: true
    },
    parentPaymentId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'payments',
            key: 'id'
        }
    },
    refundedAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    refundReason: {
        type: DataTypes.TEXT
    },
    metadata: {
        type: DataTypes.JSON
    },
    processedAt: {
        type: DataTypes.DATE
    },
    capturedAt: {
        type: DataTypes.DATE
    },
    voidedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'payments',
    timestamps: true
});

module.exports = Payment;
