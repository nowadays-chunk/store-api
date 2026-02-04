const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SupportMacro extends Model { }

    SupportMacro.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        text: { type: DataTypes.TEXT, allowNull: false },
        category: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'SupportMacro',
        tableName: 'support_macros',
        timestamps: true
    });

    return SupportMacro;
};
