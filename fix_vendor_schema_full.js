const { sequelize } = require('./src/models');

async function fixVendorSchemaFull() {
    try {
        console.log('Connecting to database via Sequelize...');

        // Disable foreign key checks temporarily
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const table = 'Vendors';
        const columnsToCheck = [
            { name: 'logo', definition: 'VARCHAR(255)' },
            { name: 'banner', definition: 'VARCHAR(255)' },
            { name: 'commissionRate', definition: 'FLOAT DEFAULT 10.0' },
            { name: 'description', definition: 'TEXT' } // Double check
        ];

        console.log(`Checking ${table} table for missing columns...`);

        for (const col of columnsToCheck) {
            const [results] = await sequelize.query(`SHOW COLUMNS FROM \`${table}\` LIKE '${col.name}'`);
            if (results.length === 0) {
                console.log(`Adding column ${col.name} to ${table}...`);
                await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col.name}\` ${col.definition}`);
                console.log(`Column ${col.name} added.`);
            } else {
                console.log(`Column ${col.name} already exists.`);
            }
        }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Vendor schema fix completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing schema:', error);
        process.exit(1);
    }
}

fixVendorSchemaFull();
