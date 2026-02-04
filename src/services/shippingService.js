const { Shipment, Order, Shipper, sequelize } = require('../models');

class ShippingService {
    /**
     * Get available shipping carriers
     */
    async getCarriers() {
        const carriers = await Shipper.findAll({
            where: { isActive: true }
        });

        return carriers;
    }

    /**
     * Calculate shipping rates
     */
    async calculateRates(orderId, destinationAddress) {
        const order = await Order.findByPk(orderId, {
            include: ['items']
        });

        if (!order) throw new Error('Order not found');

        // Calculate package weight
        const totalWeight = order.items.reduce((sum, item) =>
            sum + (item.weight || 1) * item.quantity, 0);

        // Mock rates (in real app, call carrier APIs)
        const rates = [
            {
                carrier: 'USPS',
                service: 'First Class',
                cost: 5.99,
                estimatedDays: '3-5',
                weight: totalWeight
            },
            {
                carrier: 'UPS',
                service: 'Ground',
                cost: 8.99,
                estimatedDays: '2-4',
                weight: totalWeight
            },
            {
                carrier: 'FedEx',
                service: 'Express',
                cost: 15.99,
                estimatedDays: '1-2',
                weight: totalWeight
            }
        ];

        return rates;
    }

    /**
     * Create shipment and generate label
     */
    async createShipment(orderId, shipmentData) {
        const t = await sequelize.transaction();

        try {
            const order = await Order.findByPk(orderId, { transaction: t });
            if (!order) throw new Error('Order not found');

            // Create shipment
            const shipment = await Shipment.create({
                orderId,
                carrier: shipmentData.carrier,
                service: shipmentData.service,
                trackingNumber: 'TRK' + Date.now(),
                labelUrl: `https://cdn.example.com/labels/${Date.now()}.pdf`,
                cost: shipmentData.cost,
                weight: shipmentData.weight,
                status: 'CREATED',
                shippingAddress: order.shippingAddress
            }, { transaction: t });

            // Update order
            order.status = 'PROCESSING';
            order.trackingNumber = shipment.trackingNumber;
            await order.save({ transaction: t });

            await t.commit();
            return shipment;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Mark shipment as shipped
     */
    async markShipped(shipmentId) {
        const shipment = await Shipment.findByPk(shipmentId);
        if (!shipment) throw new Error('Shipment not found');

        shipment.status = 'SHIPPED';
        shipment.shippedAt = new Date();
        await shipment.save();

        // Update order
        const order = await Order.findByPk(shipment.orderId);
        order.status = 'SHIPPED';
        order.shippedAt = new Date();
        await order.save();

        return shipment;
    }

    /**
     * Track shipment
     */
    async trackShipment(trackingNumber) {
        const shipment = await Shipment.findOne({
            where: { trackingNumber },
            include: [{ model: Order, as: 'order' }]
        });

        if (!shipment) throw new Error('Shipment not found');

        // Mock tracking events (in real app, call carrier API)
        const trackingEvents = [
            {
                status: 'LABEL_CREATED',
                location: 'Origin Facility',
                timestamp: shipment.createdAt,
                description: 'Shipping label created'
            },
            {
                status: 'PICKED_UP',
                location: 'Origin Facility',
                timestamp: shipment.shippedAt,
                description: 'Package picked up by carrier'
            }
        ];

        if (shipment.status === 'DELIVERED') {
            trackingEvents.push({
                status: 'DELIVERED',
                location: 'Destination',
                timestamp: shipment.deliveredAt,
                description: 'Package delivered'
            });
        }

        return {
            trackingNumber: shipment.trackingNumber,
            status: shipment.status,
            carrier: shipment.carrier,
            events: trackingEvents
        };
    }

    /**
     * Schedule pickup
     */
    async schedulePickup(shipmentIds, pickupDate) {
        const shipments = await Shipment.findAll({
            where: { id: shipmentIds }
        });

        for (const shipment of shipments) {
            shipment.pickupScheduledAt = pickupDate;
            await shipment.save();
        }

        return {
            message: 'Pickup scheduled',
            pickupDate,
            shipmentCount: shipments.length
        };
    }

    /**
     * Cancel shipment
     */
    async cancelShipment(shipmentId) {
        const shipment = await Shipment.findByPk(shipmentId);
        if (!shipment) throw new Error('Shipment not found');

        if (shipment.status === 'SHIPPED' || shipment.status === 'DELIVERED') {
            throw new Error('Cannot cancel shipped or delivered shipment');
        }

        shipment.status = 'CANCELLED';
        shipment.cancelledAt = new Date();
        await shipment.save();

        return shipment;
    }
}

module.exports = new ShippingService();
