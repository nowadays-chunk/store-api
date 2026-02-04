const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsToMany(models.User, {
                through: 'UserRoles',
                foreignKey: 'roleId',
                as: 'users'
            });
            Role.belongsToMany(models.Permission, {
                through: 'RolePermissions',
                foreignKey: 'roleId',
                as: 'permissions'
            });
        }
    }

    Role.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Role',
    });

    return Role;
};
