const orderService = require('../services/orderService');
const orderServiceExtended = require('../services/orderServiceExtended');

exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.cancelOrder = async (req, res, next) => {
    try {
        const order = await orderService.cancelOrder(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTracking = async (req, res, next) => {
    try {
        const { trackingNumber } = req.body;
        const order = await orderService.updateTracking(req.params.id, trackingNumber);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTracking = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json({ trackingNumber: order.trackingNumber, status: order.status });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Advanced features using orderServiceExtended
exports.getAllOrders = async (req, res, next) => {
    try {
        const result = await orderServiceExtended.getAllOrders(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.getOrderStats = async (req, res, next) => {
    try {
        const stats = await orderServiceExtended.getOrderStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

exports.getFulfillmentQueue = async (req, res, next) => {
    try {
        const queue = await orderServiceExtended.getFulfillmentQueue();
        res.json({ queue });
    } catch (error) {
        next(error);
    }
};

exports.holdOrder = async (req, res, next) => {
    try {
        const { reason } = req.body;
        const order = await orderServiceExtended.holdOrder(req.params.id, reason);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.releaseOrder = async (req, res, next) => {
    try {
        const order = await orderServiceExtended.releaseOrder(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addNote = async (req, res, next) => {
    try {
        const { note } = req.body;
        const result = await orderServiceExtended.addNote(req.params.id, note, req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotes = async (req, res, next) => {
    try {
        const notes = await orderServiceExtended.getNotes(req.params.id);
        res.json({ notes });
    } catch (error) {
        next(error);
    }
};

exports.getTimeline = async (req, res, next) => {
    try {
        const timeline = await orderServiceExtended.getTimeline(req.params.id);
        res.json({ timeline });
    } catch (error) {
        next(error);
    }
};

exports.createManualOrder = async (req, res, next) => {
    try {
        const order = await orderServiceExtended.createManualOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.reprocessOrder = async (req, res, next) => {
    try {
        const order = await orderServiceExtended.reprocessOrder(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.reshipOrder = async (req, res, next) => {
    try {
        const { trackingNumber } = req.body;
        const order = await orderServiceExtended.reshipOrder(req.params.id, trackingNumber);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.writeoffOrder = async (req, res, next) => {
    try {
        const { reason } = req.body;
        const order = await orderServiceExtended.writeoffOrder(req.params.id, reason);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addAdjustment = async (req, res, next) => {
    try {
        const order = await orderServiceExtended.addAdjustment(req.params.id, req.body);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Stubs for features not yet implemented
exports.requestReturn = async (req, res, next) => { res.json({ message: 'Return requested' }); };
exports.requestExchange = async (req, res, next) => { res.json({ message: 'Exchange requested' }); };
exports.getInvoice = async (req, res, next) => { res.json({ invoice: 'PDF data' }); };
exports.getShipments = async (req, res, next) => { res.json({ shipments: [] }); };
exports.resendConfirmation = async (req, res, next) => { res.json({ message: 'Email sent' }); };
exports.splitOrder = async (req, res, next) => { res.json({ message: 'Order split' }); };
exports.mergeOrders = async (req, res, next) => { res.json({ message: 'Orders merged' }); };

// Function aliases for route compatibility
exports.listUserOrders = exports.getUserOrders;
exports.adminListAll = exports.getAllOrders;
exports.adminOrderStats = exports.getOrderStats;
exports.adminFulfillmentQueue = exports.getFulfillmentQueue;
exports.returnOrder = exports.requestReturn;
exports.exchangeOrder = exports.requestExchange;
exports.releaseHold = exports.releaseOrder;
exports.downloadInvoice = exports.getInvoice;
exports.getOrderShipments = exports.getShipments;
exports.addAdminNote = exports.addNote;
exports.getAdminNotes = exports.getNotes;
exports.orderTimeline = exports.getTimeline;
exports.manualOrder = exports.createManualOrder;
exports.manualAdjustment = exports.addAdjustment;
exports.writeOffOrder = exports.writeoffOrder;
