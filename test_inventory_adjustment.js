const { Inventory, ProductVariant, Warehouse, sequelize } = require('./src/models');

const BASE_URL = 'http://localhost:5000/api';

async function testInventoryAdjustment() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        // 1. Get a Variant and Warehouse
        const variant = await ProductVariant.findOne();
        const warehouse = await Warehouse.findOne();

        if (!variant || !warehouse) {
            console.error('No variant or warehouse found to test with.');
            return;
        }

        console.log(`Testing with Variant: ${variant.id} (SKU: ${variant.sku})`);
        console.log(`Testing with Warehouse: ${warehouse.id}`);

        // 2. Check initial stock
        let inventory = await Inventory.findOne({ where: { variantId: variant.id, warehouseId: warehouse.id } });
        let initialQty = inventory ? inventory.quantity : 0;
        console.log(`Initial Stock: ${initialQty}`);

        // 3. Add Stock (ADJUSTMENT +10)
        console.log('Sending adjustment request (Type: IN, Qty: 10)...');
        try {
            const res = await fetch(`${BASE_URL}/inventory/adjust`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    variantId: variant.id,
                    warehouseId: warehouse.id,
                    quantity: 10,
                    type: 'IN',
                    reason: 'Test Adjustment',
                    notes: 'Automated Test'
                })
            });
            const data = await res.json();
            console.log('Response:', res.status, data.message);
        } catch (err) {
            console.error('API Error:', err.message);
        }

        // 4. Verify Final Stock
        inventory = await Inventory.findOne({ where: { variantId: variant.id, warehouseId: warehouse.id } });
        console.log(`Final Stock: ${inventory.quantity}`);

        if (inventory.quantity === initialQty + 10) {
            console.log('SUCCESS: Stock updated correctly.');
        } else {
            console.error('FAILURE: Stock mismatch.');
        }

    } catch (err) {
        console.error('Script Error:', err);
    } finally {
        // await sequelize.close(); // confusing with server running? No, just this script connection.
        // Actually, if server is running on 5000, I should just hit endpoint. But I need to read DB for verification independently.
        await sequelize.close();
    }
}

testInventoryAdjustment();
