const { sequelize, Shipper, Warehouse, Vendor, ProductVariant, Inventory } = require('./src/models');

async function fixTables() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        console.log('Syncing Shipper...');
        await Shipper.sync({ alter: true });

        console.log('Syncing Warehouse...');
        await Warehouse.sync({ alter: true });

        console.log('Syncing Vendor...');
        await Vendor.sync({ alter: true });

        console.log('Syncing ProductVariant...');
        await ProductVariant.sync({ alter: true });

        console.log('Syncing Inventory...');
        await Inventory.sync({ alter: true });

        console.log('All tables synced.');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing tables:', error);
        process.exit(1);
    }
}

fixTables();
