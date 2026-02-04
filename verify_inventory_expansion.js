const { Inventory, sequelize } = require('./src/models');

async function verifyInventoryExpansion() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        const inventoryItems = await Inventory.findAll({
            include: [
                {
                    model: require('./src/models').ProductVariant,
                    as: 'variant',
                    include: [
                        {
                            model: require('./src/models').Product,
                            as: 'product',
                            include: [
                                { model: require('./src/models').Category, as: 'category' },
                                { model: require('./src/models').Brand, as: 'brand' }
                            ]
                        }
                    ]
                },
                'warehouse'
            ],
            limit: 1
        });

        if (inventoryItems.length === 0) {
            console.log('No inventory items found to verify.');
            return;
        }

        const item = inventoryItems[0];
        console.log('Inventory ID:', item.id);
        console.log('Variant Name:', item.variant ? item.variant.sku : 'N/A');
        console.log('Product Name:', item.variant && item.variant.product ? item.variant.product.name : 'N/A');
        console.log('Category Name:', item.variant && item.variant.product && item.variant.product.category ? item.variant.product.category.name : 'N/A');
        console.log('Brand Name:', item.variant && item.variant.product && item.variant.product.brand ? item.variant.product.brand.name : 'N/A');
        console.log('Warehouse Name:', item.warehouse ? item.warehouse.name : 'N/A');

        if (item.variant && item.variant.product && item.variant.product.category && item.variant.product.brand) {
            console.log('SUCCESS: All related data retrieved successfully.');
        } else {
            console.warn('WARNING: Some data might be missing. Check if associations are correct or if test data has relations.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
}

verifyInventoryExpansion();
