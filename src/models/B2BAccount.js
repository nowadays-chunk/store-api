const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const B2BAccount = sequelize.define('B2BAccount', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxId: {
        type: DataTypes.STRING
    },
    contactEmail: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    contactPhone: {
        type: DataTypes.STRING
    },
    website: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED'),
        defaultValue: 'PENDING'
    },
    creditLimit: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    paymentTerms: {
        type: DataTypes.STRING,
        defaultValue: 'NET30'
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'b2b_accounts'
});

B2BAccount.associate = (models) => {
    B2BAccount.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    // Potential future associations: orders, quotes, addresses
};

module.exports = B2BAccount;
