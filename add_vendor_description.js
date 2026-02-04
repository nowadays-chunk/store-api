const { sequelize } = require('./src/models');

async function fixVendorSchema() {
    try {
        console.log('Connecting to database via Sequelize...');

        // Disable foreign key checks temporarily just in case
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        console.log('Checking Vendors table for description column...');
        const [results] = await sequelize.query("SHOW COLUMNS FROM Vendors LIKE 'description'");

        if (results.length === 0) {
            console.log('Adding description column to Vendors table...');
            await sequelize.query("ALTER TABLE Vendors ADD COLUMN description TEXT");
            console.log('Column added successfully.');
        } else {
            console.log('description column already exists.');
        }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing schema:', error);
        process.exit(1);
    }
}

fixVendorSchema();
