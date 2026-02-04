const orderService = require('../services/orderService');

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

// Stubs for advanced features
exports.requestReturn = async (req, res, next) => { res.json({ message: 'Return requested' }); };
exports.requestExchange = async (req, res, next) => { res.json({ message: 'Exchange requested' }); };
exports.getInvoice = async (req, res, next) => { res.json({ invoice: 'PDF data' }); };
exports.getShipments = async (req, res, next) => { res.json({ shipments: [] }); };
exports.addNote = async (req, res, next) => { res.json({ message: 'Note added' }); };
exports.getNotes = async (req, res, next) => { res.json({ notes: [] }); };
exports.resendConfirmation = async (req, res, next) => { res.json({ message: 'Email sent' }); };
exports.splitOrder = async (req, res, next) => { res.json({ message: 'Order split' }); };
exports.mergeOrders = async (req, res, next) => { res.json({ message: 'Orders merged' }); };
exports.getAllOrders = async (req, res, next) => { res.json({ orders: [] }); };
exports.getOrderStats = async (req, res, next) => { res.json({ stats: {} }); };
exports.getFulfillmentQueue = async (req, res, next) => { res.json({ queue: [] }); };
exports.holdOrder = async (req, res, next) => { res.json({ message: 'Order on hold' }); };
exports.releaseOrder = async (req, res, next) => { res.json({ message: 'Order released' }); };
exports.reprocessOrder = async (req, res, next) => { res.json({ message: 'Order reprocessed' }); };
exports.createManualOrder = async (req, res, next) => { res.json({ message: 'Manual order created' }); };
exports.addAdjustment = async (req, res, next) => { res.json({ message: 'Adjustment added' }); };
exports.getTimeline = async (req, res, next) => { res.json({ timeline: [] }); };
exports.reshipOrder = async (req, res, next) => { res.json({ message: 'Order reshipped' }); };
exports.writeoffOrder = async (req, res, next) => { res.json({ message: 'Order written off' }); };
