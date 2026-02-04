const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Channel extends Model {
        static associate(models) {
            Channel.hasMany(models.Store, { foreignKey: 'channelId' });
        }
    }

    Channel.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false }, // e.g., 'Web', 'Mobile App', 'POS', 'Marketplace A'
        type: { type: DataTypes.STRING, allowNull: false }, // online, retail, marketplace
        config: DataTypes.JSON, // API keys, specific settings
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Channel',
    });

    return Channel;
};
