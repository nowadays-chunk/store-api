const { Product, ProductVariant, Inventory, sequelize } = require('./src/models');

async function fixInventoryOrphans() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        // 1. Find variants without products
        const orphanedVariants = await ProductVariant.findAll({
            where: { productId: null }
        });
        console.log(`Found ${orphanedVariants.length} variants with null productId.`);

        // 2. Find a fallback product (the one named "ttt" maybe?)
        const fallbackProduct = await Product.findOne();
        if (!fallbackProduct) {
            console.log('No products found to link to. Please create a product first.');
            return;
        }
        console.log(`Using fallback product: ${fallbackProduct.name} (${fallbackProduct.id})`);

        if (orphanedVariants.length > 0) {
            for (const v of orphanedVariants) {
                await v.update({ productId: fallbackProduct.id });
                console.log(`Linked variant ${v.sku} to product ${fallbackProduct.name}`);
            }
        }

        // 3. Check for invalid productIds
        const allVariants = await ProductVariant.findAll();
        for (const v of allVariants) {
            if (v.productId) {
                const p = await Product.findByPk(v.productId);
                if (!p) {
                    console.log(`Variant ${v.sku} has invalid productId ${v.productId}. Linking to fallback.`);
                    await v.update({ productId: fallbackProduct.id });
                }
            }
        }

        console.log('Orphan fix complete.');

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

fixInventoryOrphans();
