/**
 * RMA (Return Merchandise Authorization) Controller
 * Handles product returns, refunds, and RMA processing
 */

const { Order, OrderItem, Product, User } = require('../models');

/**
 * Create RMA request
 */
/**
 * Get all RMA requests
 */
exports.getAllRMAs = async (req, res, next) => {
    try {
        // Mock list for now
        const rmas = [
            {
                id: 'RMA-MOCK-1',
                orderId: 'ORD-123',
                customerName: 'John Doe',
                status: 'PENDING',
                reason: 'Defective',
                requestedAt: new Date(),
                items: [{ title: 'Widget X', quantity: 1 }]
            }
        ];
        res.json(rmas);
    } catch (error) {
        next(error);
    }
};

/**
 * Create RMA request
 */
exports.createRMA = async (req, res, next) => {
    try {
        const { orderId, items, reason, description } = req.body;

        // Verify order exists and belongs to user
        const order = await Order.findOne({
            where: { id: orderId, userId: req.user.id },
            include: [{ model: OrderItem, as: 'items' }]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create RMA record
        const rma = {
            id: 'RMA-' + Date.now(),
            orderId,
            userId: req.user.id,
            items,
            reason,
            description,
            status: 'PENDING',
            createdAt: new Date()
        };

        res.status(201).json({
            message: 'RMA request created successfully',
            rma
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get RMA details
 */
exports.getRMADetails = async (req, res, next) => {
    try {
        const { rmaId } = req.params;

        // Mock RMA data
        const rma = {
            id: rmaId,
            orderId: 'ORD-123',
            status: 'APPROVED',
            reason: 'Defective product',
            items: [
                { productId: 1, quantity: 1, condition: 'DAMAGED' }
            ],
            trackingNumber: 'TRACK-' + Date.now(),
            createdAt: new Date(),
            approvedAt: new Date()
        };

        res.json(rma);
    } catch (error) {
        next(error);
    }
};

/**
 * Approve RMA request
 */
exports.approveRMA = async (req, res, next) => {
    try {
        const { rmaId } = req.params;
        const { returnLabel, instructions } = req.body;

        res.json({
            message: 'RMA approved',
            rmaId,
            status: 'APPROVED',
            returnLabel,
            instructions: instructions || 'Please ship the item back using the provided label'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Reject RMA request
 */
exports.rejectRMA = async (req, res, next) => {
    try {
        const { rmaId } = req.params;
        const { rejectionReason } = req.body;

        res.json({
            message: 'RMA rejected',
            rmaId,
            status: 'REJECTED',
            reason: rejectionReason
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Receive RMA item at warehouse
 */
exports.receiveRMAItem = async (req, res, next) => {
    try {
        const { rmaId } = req.params;
        const { condition, notes, inspectorId } = req.body;

        res.json({
            message: 'RMA item received',
            rmaId,
            status: 'RECEIVED',
            condition,
            notes,
            receivedAt: new Date(),
            inspectorId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Process refund for RMA
 */
exports.refundRMA = async (req, res, next) => {
    try {
        const { rmaId } = req.params;
        const { refundAmount, refundMethod } = req.body;

        res.json({
            message: 'Refund processed',
            rmaId,
            refundAmount,
            refundMethod: refundMethod || 'ORIGINAL_PAYMENT',
            status: 'REFUNDED',
            refundedAt: new Date()
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get return reasons
 */
exports.getReturnReasons = async (req, res, next) => {
    try {
        const reasons = [
            { id: 1, code: 'DEFECTIVE', label: 'Defective or damaged product' },
            { id: 2, code: 'WRONG_ITEM', label: 'Wrong item received' },
            { id: 3, code: 'NOT_AS_DESCRIBED', label: 'Not as described' },
            { id: 4, code: 'SIZE_ISSUE', label: 'Size/fit issue' },
            { id: 5, code: 'CHANGED_MIND', label: 'Changed mind' },
            { id: 6, code: 'BETTER_PRICE', label: 'Found better price' },
            { id: 7, code: 'OTHER', label: 'Other reason' }
        ];

        res.json({ reasons });
    } catch (error) {
        next(error);
    }
};

/**
 * Get return shipping labels
 */
exports.getReturnLabels = async (req, res, next) => {
    try {
        const { rmaId } = req.params;

        const label = {
            rmaId,
            trackingNumber: 'RETURN-' + Date.now(),
            carrier: 'UPS',
            labelUrl: `https://example.com/labels/${rmaId}.pdf`,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        };

        res.json({ label });
    } catch (error) {
        next(error);
    }
};

/**
 * Get RMA inspections
 */
exports.getInspections = async (req, res, next) => {
    try {
        const inspections = [
            {
                id: 1,
                rmaId: 'RMA-123',
                condition: 'GOOD',
                notes: 'Item in acceptable condition',
                inspectedBy: 'Inspector-1',
                inspectedAt: new Date()
            }
        ];

        res.json({ inspections });
    } catch (error) {
        next(error);
    }
};

/**
 * Get disposal records
 */
exports.getDisposals = async (req, res, next) => {
    try {
        const disposals = [
            {
                id: 1,
                rmaId: 'RMA-123',
                method: 'RECYCLE',
                reason: 'Beyond repair',
                disposedAt: new Date()
            }
        ];

        res.json({ disposals });
    } catch (error) {
        next(error);
    }
};
