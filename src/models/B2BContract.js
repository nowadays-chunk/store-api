const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class B2BContract extends Model {
        static associate(models) {
            B2BContract.belongsTo(models.B2BAccount, { foreignKey: 'accountId' });
        }
    }

    B2BContract.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        contractNumber: { type: DataTypes.STRING, unique: true },
        title: DataTypes.STRING,
        status: { type: DataTypes.STRING, defaultValue: 'active' }, // active, expired, terminated
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        terms: DataTypes.TEXT,
        fileUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'B2BContract',
        tableName: 'b2b_contracts'
    });

    return B2BContract;
};
