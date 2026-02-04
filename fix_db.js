const { sequelize } = require('./src/models');

async function fixSchema() {
    try {
        console.log('Starting Database Schema Fix (Wait while checking existing columns)...');

        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const addColumnIfMissing = async (table, column, definition) => {
            const [results] = await sequelize.query(`SHOW COLUMNS FROM \`${table}\` LIKE '${column}'`);
            if (results.length === 0) {
                console.log(`Adding column ${column} to ${table}...`);
                await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
            } else {
                console.log(`Column ${column} already exists in ${table}.`);
            }
        };

        console.log('1. Fixing Shippers Table...');
        await addColumnIfMissing('shippers', 'services', 'JSON');
        await addColumnIfMissing('shippers', 'config', 'JSON');
        await addColumnIfMissing('shippers', 'trackingUrl', 'VARCHAR(500)');

        console.log('2. Fixing Vendors Table...');
        await addColumnIfMissing('Vendors', 'slug', 'VARCHAR(255)');
        // Ensure slug is unique if not already
        try {
            await sequelize.query('ALTER TABLE Vendors ADD UNIQUE (slug)');
        } catch (e) {
            console.log('Note: slug unique constraint might already exist.');
        }

        console.log('3. Fixing Products Table...');
        await addColumnIfMissing('Products', 'vendorId', 'CHAR(36)');

        console.log('4. Fixing Warehouses Table...');
        await addColumnIfMissing('warehouses', 'city', 'VARCHAR(255)');
        await addColumnIfMissing('warehouses', 'address', 'VARCHAR(500)');
        await addColumnIfMissing('warehouses', 'postalCode', 'VARCHAR(20)');

        console.log('5. Fixing Sessions Table...');
        // Drop problematic FK if exists
        try {
            await sequelize.query('ALTER TABLE Sessions DROP FOREIGN KEY sessions_ibfk_2');
        } catch (e) {
            console.log('Note: sessions_ibfk_2 not found or already dropped.');
        }

        await sequelize.query('ALTER TABLE Sessions MODIFY userId CHAR(36) NULL');

        try {
            await sequelize.query('ALTER TABLE Sessions ADD CONSTRAINT sessions_ibfk_2 FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE SET NULL ON UPDATE CASCADE');
        } catch (e) {
            console.log('Note: sessions_ibfk_2 already exists.');
        }

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Database schema fixed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing database schema:', error);
        process.exit(1);
    }
}

fixSchema();
