const vendorService = require('../services/vendorService');

/**
 * Get all vendors
 */
exports.getAllVendors = async (req, res, next) => {
    try {
        const result = await vendorService.getAllVendors(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Get vendor by ID
 */
exports.getVendorById = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json(vendor);
    } catch (error) {
        next(error);
    }
};

/**
 * Create vendor
 */
exports.createVendor = async (req, res, next) => {
    try {
        const vendor = await vendorService.createVendor(req.body);
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update vendor
 */
exports.updateVendor = async (req, res, next) => {
    try {
        const vendor = await vendorService.updateVendor(req.params.id, req.body);
        res.json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete vendor
 */
exports.deleteVendor = async (req, res, next) => {
    try {
        await Vendor.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Vendor deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get vendor products
 */
exports.getVendorProducts = async (req, res, next) => {
    try {
        const products = await vendorService.getVendorProducts(req.params.id);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

/**
 * Get vendor payouts
 */
exports.getVendorPayouts = async (req, res, next) => {
    try {
        const payouts = await vendorService.getVendorPayouts(req.params.id);
        res.json({ payouts });
    } catch (error) {
        next(error);
    }
};

/**
 * Create payout
 */
exports.createPayout = async (req, res, next) => {
    try {
        const { amount, period } = req.body;
        const payout = await vendorService.createPayout(req.params.id, amount, period);
        res.status(201).json(payout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Process payout
 */
exports.processPayout = async (req, res, next) => {
    try {
        const payout = await vendorService.processPayout(req.params.payoutId);
        res.json(payout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Calculate commission
 */
exports.calculateCommission = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        const commission = await vendorService.calculateCommission(req.params.id, orderId);
        res.json(commission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Approve vendor
 */
exports.approveVendor = async (req, res, next) => {
    try {
        const vendor = await vendorService.approveVendor(req.params.id);
        res.json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Suspend vendor
 */
exports.suspendVendor = async (req, res, next) => {
    try {
        const { reason } = req.body;
        const vendor = await vendorService.suspendVendor(req.params.id, reason);
        res.json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
