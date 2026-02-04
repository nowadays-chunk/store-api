// fetch is now global in Node 25+
async function debugEndpoints() {
    const BASE_URL = 'http://localhost:5000/api';

    console.log('--- Testing /api/inventory ---');
    try {
        const res = await fetch(`${BASE_URL}/inventory`);
        const data = await res.json();
        console.log(`Inventory Items Count: ${data.length}`);
        if (data.length > 0) {
            const firstItem = data[0];
            console.log('First Item keys:', Object.keys(firstItem));
            console.log('Variant keys:', firstItem.variant ? Object.keys(firstItem.variant) : 'No Variant');
            if (firstItem.variant && firstItem.variant.product) {
                console.log('Product keys:', Object.keys(firstItem.variant.product));
                console.log('Product Name:', firstItem.variant.product.name);
            }
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

            console.log(`\n--- Testing Status Update to SHIPPED for ${firstOrder.id} ---`);
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
