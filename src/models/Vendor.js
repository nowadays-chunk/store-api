const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vendor extends Model {
        static associate(models) {
            Vendor.hasMany(models.Product, { foreignKey: 'vendorId', as: 'products' });
            Vendor.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
            Vendor.hasMany(models.Payout, { foreignKey: 'vendorId', as: 'payouts' });
        }
    }

    Vendor.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: DataTypes.TEXT,
        logo: DataTypes.STRING,
        banner: DataTypes.STRING,
        commissionRate: { type: DataTypes.FLOAT, defaultValue: 10.0 }, // Percentage
        status: {
            type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'),
            defaultValue: 'PENDING'
        },
        verificationStatus: {
            type: DataTypes.ENUM('UNVERIFIED', 'VERIFIED'),
            defaultValue: 'UNVERIFIED'
        }
    }, {
        sequelize,
        modelName: 'Vendor',
    });

    return Vendor;
};
