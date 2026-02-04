const { Shipper } = require('../models');

exports.getAllShippers = async (req, res, next) => {
    try {
        const shippers = await Shipper.findAll();
        res.json(shippers);
    } catch (error) {
        next(error);
    }
};

exports.getShipperById = async (req, res, next) => {
    try {
        const shipper = await Shipper.findByPk(req.params.id);
        if (!shipper) return res.status(404).json({ message: 'Shipper not found' });
        res.json(shipper);
    } catch (error) {
        next(error);
    }
};

exports.createShipper = async (req, res, next) => {
    try {
        const shipper = await Shipper.create(req.body);
        res.status(201).json(shipper);
    } catch (error) {
        next(error);
    }
};

exports.updateShipper = async (req, res, next) => {
    try {
        const shipper = await Shipper.findByPk(req.params.id);
        if (!shipper) return res.status(404).json({ message: 'Shipper not found' });
        await shipper.update(req.body);
        res.json(shipper);
    } catch (error) {
        next(error);
    }
};

exports.deleteShipper = async (req, res, next) => {
    try {
        const shipper = await Shipper.findByPk(req.params.id);
        if (!shipper) return res.status(404).json({ message: 'Shipper not found' });
        await shipper.destroy();
        res.json({ message: 'Shipper deleted' });
    } catch (error) {
        next(error);
    }
};
