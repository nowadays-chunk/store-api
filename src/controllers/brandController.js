const { Brand, Product } = require('../models');

const brandController = {
    getAllBrands: async (req, res, next) => {
        try {
            const brands = await Brand.findAll();
            res.json(brands);
        } catch (error) {
            next(error);
        }
    },

    createBrand: async (req, res, next) => {
        try {
            const brand = await Brand.create(req.body);
            res.status(201).json(brand);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBrand: async (req, res, next) => {
        try {
            const brand = await Brand.findByPk(req.params.id);
            if (!brand) return res.status(404).json({ message: 'Brand not found' });
            await brand.update(req.body);
            res.json(brand);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteBrand: async (req, res, next) => {
        try {
            const brand = await Brand.findByPk(req.params.id);
            if (!brand) return res.status(404).json({ message: 'Brand not found' });
            await brand.destroy();
            res.json({ message: 'Brand deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getBrandProducts: async (req, res, next) => {
        try {
            const products = await Product.findAll({
                where: { brandId: req.params.id, status: 'active' }
            });
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = brandController;
