const { Order, sequelize } = require('./src/models');

async function testOrderStatusUpdate() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        // 1. Find an existing order
        const order = await Order.findOne();
        if (!order) {
            console.log('No order found to test.');
            return;
        }

        console.log(`Testing with Order: ${order.id} (Current Status: ${order.status})`);

        // 2. Mock Request Body
        const newStatus = 'SHIPPED'; // Valid status

        // Simulate what the controller does
        // exports.updateOrderStatus = async (req, res, next) => {
        //     try {
        //         const { status } = req.body; ...

        console.log(`Attempting update to: ${newStatus}`);

        try {
            const updatedOrder = await order.update({ status: newStatus });
            console.log('Direct DB Update Success:', updatedOrder.status);
        } catch (err) {
            console.error('Direct DB Update Failed:', err.message);
        }

        // Test via API (mocking controller logic)
        // Check if ENUM values match
        const statusEnum = Order.rawAttributes.status.values;
        console.log('Valid Statuses:', statusEnum);

        if (!statusEnum.includes(newStatus)) {
            console.error('INVALID STATUS VALUE DETECTED!');
        }

    } catch (err) {
        console.error('Script Error:', err);
    } finally {
        await sequelize.close();
    }
}

testOrderStatusUpdate();
