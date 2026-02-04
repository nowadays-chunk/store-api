const fetch = require('node:fetch');

async function debugEndpoints() {
    const BASE_URL = 'http://localhost:5000/api';

    console.log('--- Testing /api/inventory ---');
    try {
        const res = await fetch(`${BASE_URL}/inventory`);
        const data = await res.json();
        console.log(`Inventory Items Count: ${data.length}`);
        if (data.length > 0) {
            const firstItem = data[0];
            console.log('First Item Detail:');
            console.log(JSON.stringify(firstItem, null, 2));
        }
    } catch (err) {
        console.error('Inventory API failed:', err.message);
    }

    console.log('\n--- Testing /api/orders ---');
    try {
        const res = await fetch(`${BASE_URL}/orders`);
        const data = await res.json();
        console.log(`Orders Count: ${data.length}`);
        if (data.length > 0) {
            const firstOrder = data[0];
            console.log('First Order ID:', firstOrder.id);
            console.log('First Order Status:', firstOrder.status);

            console.log('\n--- Testing Status Update SHIPPED ---');
            const updateRes = await fetch(`${BASE_URL}/orders/${firstOrder.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'SHIPPED' })
            });
            const updateData = await updateRes.json();
            console.log('Update Response Status:', updateRes.status);
            console.log('Update Response:', updateData);
        }
    } catch (err) {
        console.error('Orders API failed:', err.message);
    }
}

debugEndpoints();
