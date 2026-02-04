const { Product, ProductVariant, Inventory, Warehouse, sequelize } = require('./src/models');

async function fixOrphanedProducts() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        const products = await Product.findAll({
            include: ['variants']
        });

        let defaultWarehouse = await Warehouse.findOne();
        if (!defaultWarehouse) {
            console.log('No warehouse found. Creating default warehouse...');
            defaultWarehouse = await Warehouse.create({
                name: 'Main Warehouse',
                code: 'MAIN',
                address: '123 Main St',
                city: 'City',
                country: 'Country',
                isActive: true
            });
        }
        console.log('Using Warehouse:', defaultWarehouse.id);

        for (const product of products) {
            let variant;
            if (!product.variants || product.variants.length === 0) {
                console.log(`Fixing product: ${product.name} (${product.id})`);

                const t = await sequelize.transaction();
                try {
                    variant = await ProductVariant.create({
                        productId: product.id,
                        name: 'Default',
                        sku: product.sku || `SKU-${product.id.split('-')[0]}`,
                        price: product.basePrice || 0,
                        stock: 0
                    }, { transaction: t });

                    await Inventory.create({
                        variantId: variant.id,
                        warehouseId: defaultWarehouse.id,
                        quantity: 100
                    }, { transaction: t });

                    await t.commit();
                    console.log(`Warning: Created default variant and inventory for ${product.name}`);
                } catch (err) {
                    await t.rollback();
                    console.error(`Failed to fix ${product.name}:`, err.message);
                }
            } else {
                variant = product.variants[0];
            }

            // Check if inventory exists for the variant
            if (variant) {
                const inventory = await Inventory.findOne({ where: { variantId: variant.id, warehouseId: defaultWarehouse.id } });
                if (!inventory) {
                    console.log(`Fixing missing inventory for ${product.name} (Variant: ${variant.id})`);
                    await Inventory.create({
                        variantId: variant.id,
                        warehouseId: defaultWarehouse.id,
                        quantity: 100
                    });
                }
            }
        }

        console.log('Done.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
}

fixOrphanedProducts();
