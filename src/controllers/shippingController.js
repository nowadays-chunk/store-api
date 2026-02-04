const shippingService = require('../services/shippingService');

/**
 * Get carriers
 */
exports.getCarriers = async (req, res, next) => {
    try {
        const carriers = await shippingService.getCarriers();
        res.json(carriers);
    } catch (error) {
        next(error);
    }
};

/**
 * Calculate shipping rates
 */
exports.calculateRates = async (req, res, next) => {
    try {
        const { orderId, destinationAddress } = req.body;
        const rates = await shippingService.calculateRates(orderId, destinationAddress);
        res.json(rates);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Create shipment
 */
exports.createShipment = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const shipment = await shippingService.createShipment(orderId, req.body);
        res.status(201).json(shipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Mark shipment as shipped
 */
exports.markShipped = async (req, res, next) => {
    try {
        const { shipmentId } = req.params;
        const shipment = await shippingService.markShipped(shipmentId);
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Track shipment
 */
exports.trackShipment = async (req, res, next) => {
    try {
        const { trackingNumber } = req.params;
        const tracking = await shippingService.trackShipment(trackingNumber);
        res.json(tracking);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * Schedule pickup
 */
exports.schedulePickup = async (req, res, next) => {
    try {
        const { shipmentIds, pickupDate } = req.body;
        const result = await shippingService.schedulePickup(shipmentIds, pickupDate);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Cancel shipment
 */
exports.cancelShipment = async (req, res, next) => {
    try {
        const { shipmentId } = req.params;
        const shipment = await shippingService.cancelShipment(shipmentId);
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Auto-generated stub functions
exports.getRates = async (req, res, next) => {
    try {
        res.json({ message: 'getRates endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.createLabel = async (req, res, next) => {
    try {
        res.json({ message: 'createLabel endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

exports.getLabel = async (req, res, next) => {
    try {
        res.json({ message: 'getLabel endpoint', data: {} });
    } catch (error) {
        next(error);
    }
};

