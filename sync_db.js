const { sequelize } = require('./src/models');

async function syncDB() {
    try {
        console.log('Synchronizing database...');
        // Using alter: true to update existing tables without data loss context
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');

        // Ensure admin user exists and has correct role
        const { User } = require('./src/models');
        const adminEmail = 'admin@example.com';
        const [admin, created] = await User.findOrCreate({
            where: { email: adminEmail },
            defaults: {
                firstName: 'Admin',
                lastName: 'User',
                passwordHash: '$2b$10$YourHashedPassword', // Replace with a real hash if needed for login
                role: 'admin',
                isActive: true,
                isVerified: true
            }
        });

        if (!created && admin.role !== 'admin') {
            admin.role = 'admin';
            await admin.save();
            console.log(`Updated user ${adminEmail} to admin role.`);
        } else if (created) {
            console.log(`Created admin user: ${adminEmail}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing database:', error);
        process.exit(1);
    }
}

syncDB();
