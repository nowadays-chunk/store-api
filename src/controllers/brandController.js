const brandService = require('../services/brandService');

exports.getAllBrands = async (req, res, next) => {
    try {
        const result = await brandService.getAllBrands(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.getBrandById = async (req, res, next) => {
    try {
        const brand = await brandService.getBrandById(req.params.id);
        res.json(brand);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createBrand = async (req, res, next) => {
    try {
        const brand = await brandService.createBrand(req.body);
        res.status(201).json(brand);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBrand = async (req, res, next) => {
    try {
        const brand = await brandService.updateBrand(req.params.id, req.body);
        res.json(brand);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBrand = async (req, res, next) => {
    try {
        const result = await brandService.deleteBrand(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBrandProducts = async (req, res, next) => {
    try {
        const products = await brandService.getBrandProducts(req.params.id);
        res.json({ products });
    } catch (error) {
        next(error);
    }
};
