const { Vendor } = require('../models');

exports.getAllVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.findAll();
        res.json(vendors);
    } catch (error) {
        next(error);
    }
};

exports.getVendorById = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json(vendor);
    } catch (error) {
        next(error);
    }
};

exports.createVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.create(req.body);
        res.status(201).json(vendor);
    } catch (error) {
        next(error);
    }
};

exports.updateVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        await vendor.update(req.body);
        res.json(vendor);
    } catch (error) {
        next(error);
    }
};

exports.deleteVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        await vendor.destroy();
        res.json({ message: 'Vendor deleted' });
    } catch (error) {
        next(error);
    }
};

exports.getVendorProducts = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVendorPayouts = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVendorSettlements = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVendorKYC = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVendorRatings = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVendorDisputes = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.applyAsVendor = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getCommissionRules = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
