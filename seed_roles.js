const { Role } = require('./src/models');

async function seedRoles() {
    try {
        const roles = ['ADMIN', 'CUSTOMER', 'MANAGER'];

        for (const roleName of roles) {
            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { description: `${roleName} Role` }
            });
            console.log(created ? `Created role: ${roleName}` : `Role already exists: ${roleName}`);
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

seedRoles();
