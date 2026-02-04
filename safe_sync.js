const { sequelize, User } = require('./src/models');

async function safeSync() {
    try {
        console.log('Synchronizing database (Manual Steps)...');

        // Disable foreign key checks for the sync
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Sync models
        await sequelize.sync({ alter: true });

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Database synchronized successfully.');

        // Ensure admin user exists and has correct role
        const adminEmail = 'admin@example.com';
        const user = await User.findOne({ where: { email: adminEmail } });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`Ensured user ${adminEmail} has admin role.`);
        } else {
            console.log(`Admin user ${adminEmail} not found. Please register it first.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing database:', error);
        process.exit(1);
    }
}

safeSync();
