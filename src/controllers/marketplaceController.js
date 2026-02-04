const { Vendor, Payout } = require('../models');

exports.getAllVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.findAll();
        res.json(vendors);
    } catch (error) {
        next(error);
    }
};

exports.registerVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.create(req.body);
        res.status(201).json(vendor);
    } catch (error) {
        next(error);
    }
};

exports.approveVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        await vendor.update({ status: 'APPROVED' });
        res.json(vendor);
    } catch (error) {
        next(error);
    }
};
