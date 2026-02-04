const db = require('../models');
const Inventory = db.Inventory;
const Product = db.Product;
const Order = db.Order;
const AuditLog = db.AuditLog; // Use AuditLog for tracking webhooks

const webhookController = {
    // Inventory Webhook
    // Expected Payload: { sku: 'ABC', quantity: 100, warehouseId: 'UUID' }
    inventoryWebhook: async (req, res, next) => {
        try {
            const { sku, quantity, warehouseId } = req.body;

            if (!sku || quantity === undefined) {
                return res.status(400).json({ success: false, message: 'Missing sku or quantity' });
            }

            // Log reception
            await logWebhook('INVENTORY_WEBHOOK', req.body);

            // Find Inventory record by SKU
            // Note: SKU might be on Product or Variant. Inventory model has 'sku' field directly too in this schema.
            // If warehouseId is provided, filter by it, else might update all or default? 
            // Assuming simplified logic: update specific warehouse record if ID provided, else first match.
            const where = { sku };
            if (warehouseId) where.warehouseId = warehouseId;

            let inventory = await Inventory.findOne({ where });

            if (inventory) {
                await inventory.update({ quantity });
                console.log(`Updated inventory for SKU ${sku} to ${quantity}`);
            } else {
                // Determine if we should create? Maybe if Product matches.
                // for now just warn
                console.warn(`Inventory not found for SKU ${sku}`);
                return res.status(404).json({ success: false, message: 'Inventory record not found for SKU' });
            }

            res.json({ success: true, message: 'Inventory updated successfully', data: { sku, quantity } });
        } catch (error) {
            console.error('Webhook Error:', error);
            next(error);
        }
    },

    // Generic Webhook Handler (e.g., Stripe, Shipping Carrier)
    handleWebhook: async (req, res, next) => {
        try {
            const eventType = req.body.type || 'unknown_event';
            const eventData = req.body.data || req.body;

            await logWebhook(eventType, eventData);

            // Switch logic for different types
            switch (eventType) {
                case 'order.shipped':
                    if (eventData.orderId) {
                        const order = await Order.findByPk(eventData.orderId);
                        if (order) await order.update({ status: 'shipped' });
                    }
                    break;
                case 'payment.succeeded':
                    // Handle payment logic
                    break;
                default:
                    console.log(`Unhandled webhook type: ${eventType}`);
            }

            res.json({ success: true, message: 'Webhook received' });
        } catch (error) {
            next(error);
        }
    },

    // Order Webhook (Specific endpoint if needed)
    orderWebhook: async (req, res, next) => {
        try {
            const { orderId, status } = req.body;
            if (!orderId || !status) return res.status(400).json({ message: 'Invalid payload' });

            await logWebhook('ORDER_WEBHOOK', req.body);

            const order = await Order.findByPk(orderId);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            await order.update({ status });
            res.json({ success: true, message: 'Order status updated' });
        } catch (error) {
            next(error);
        }
    }
};

// Helper
async function logWebhook(type, payload) {
    if (AuditLog) {
        try {
            await AuditLog.create({
                action: 'WEBHOOK_RECEIVED',
                entityType: 'Webhook',
                entityId: type,
                changes: payload,
                status: 'success',
                ipAddress: '0.0.0.0' // Mock or req.ip if passed
            });
        } catch (e) {
            console.error('Failed to log webhook', e);
        }
    }
}

module.exports = webhookController;
