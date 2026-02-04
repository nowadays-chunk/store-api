const { Order, Inventory, ProductVariant, Product, sequelize } = require('./src/models');

async function rawDebug() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        const orders = await Order.findAll({ raw: true });
        console.log('--- RAW ORDERS ---');
        orders.forEach(o => console.log(`ID: ${o.id}, Status: "${o.status}"`));

        const inventory = await Inventory.findAll({
            include: [
                {
                    model: ProductVariant,
                    as: 'variant',
                    include: ['product']
                }
            ],
            limit: 5
        });
        console.log('\n--- INVENTORY DATA STRUCTURE ---');
        inventory.forEach((i, idx) => {
            console.log(`Item ${idx}: id=${i.id}, qty=${i.quantity}`);
            console.log(`  variant exists: ${!!i.variant}`);
            if (i.variant) {
                console.log(`  product exists: ${!!i.variant.product}`);
                if (i.variant.product) {
                    console.log(`  product name: "${i.variant.product.name}"`);
                }
            }
        });

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

rawDebug();
