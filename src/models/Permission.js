const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.Role, {
                through: 'RolePermissions',
                foreignKey: 'permissionId',
                as: 'roles'
            });
        }
    }

    Permission.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Format: resource:action e.g. users:create'
        },
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Permission',
    });

    return Permission;
};
