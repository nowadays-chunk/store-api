const { User, Role } = require('./src/models');
const bcrypt = require('bcrypt');

async function createAdmin() {
    try {
        // You can change these details
        const firstName = 'Admin';
        const lastName = 'User';
        const email = 'admin@tailoredbridge.com';
        const password = 'adminPassword123!';

        console.log(`Creating/Promoting admin user: ${email}`);

        // 1. Ensure ADMIN role exists
        const [adminRole] = await Role.findOrCreate({
            where: { name: 'ADMIN' },
            defaults: { description: 'Administrator with full access' }
        });

        // 2. Check if user exists
        let user = await User.findOne({ where: { email } });

        if (user) {
            console.log('User already exists. Assigning ADMIN role...');
        } else {
            console.log('Creating new user...');
            // Password hashing handled by hook usually, but let's rely on User.create
            user = await User.create({
                firstName,
                lastName,
                email,
                password,
                isVerified: true
            });
        }

        // 3. Assign Role
        const hasRole = await user.hasRole(adminRole);
        if (!hasRole) {
            await user.addRole(adminRole);
            console.log(`Role 'ADMIN' assigned to ${user.email}`);
        } else {
            console.log(`User ${user.email} already has 'ADMIN' role.`);
        }

    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

createAdmin();
