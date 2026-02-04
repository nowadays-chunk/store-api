const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaxRate extends Model {
        static associate(models) {
            // Could be linked to Countries or Zones (Address related)
        }
    }

    TaxRate.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        rate: { type: DataTypes.FLOAT, allowNull: false }, // Percentage
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        type: { type: DataTypes.ENUM('VAT', 'SALES_TAX'), defaultValue: 'VAT' },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'TaxRate',
    });

    return TaxRate;
};
