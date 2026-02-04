const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ContentBlock extends Model {
        static associate(models) {
            // Reusable blocks
        }
    }

    ContentBlock.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        identifier: { type: DataTypes.STRING, allowNull: false, unique: true },
        title: DataTypes.STRING,
        content: DataTypes.JSON, // Structured content
        type: { type: DataTypes.STRING, defaultValue: 'html' }
    }, {
        sequelize,
        modelName: 'ContentBlock',
    });

    return ContentBlock;
};
