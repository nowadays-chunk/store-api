/**
 * Tax Controller
 * Handles tax rate management and calculations
 */

exports.getTaxRates = async (req, res, next) => {
    try {
        const taxRates = await TaxRate.findAll();
        res.json({ taxRates });
    } catch (error) {
        next(error);
    }
};

exports.getTaxRateById = async (req, res, next) => {
    try {
        const taxRate = await TaxRate.findByPk(req.params.id);
        if (!taxRate) return res.status(404).json({ message: 'Tax rate not found' });
        res.json(taxRate);
    } catch (error) {
        next(error);
    }
};

exports.createTaxRate = async (req, res, next) => {
    try {
        const taxRate = await TaxRate.create(req.body);
        res.status(201).json(taxRate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTaxRate = async (req, res, next) => {
    try {
        const taxRate = await TaxRate.findByPk(req.params.id);
        if (!taxRate) return res.status(404).json({ message: 'Tax rate not found' });

        await taxRate.update(req.body);
        res.json(taxRate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTaxRate = async (req, res, next) => {
    try {
        const taxRate = await TaxRate.findByPk(req.params.id);
        if (!taxRate) return res.status(404).json({ message: 'Tax rate not found' });

        await taxRate.destroy();
        res.json({ message: 'Tax rate deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.calculateTax = async (req, res, next) => {
    try {
        const { amount, region, productType } = req.body;

        // Find applicable tax rate
        const taxRate = await TaxRate.findOne({
            where: { region, isActive: true }
        });

        const rate = taxRate ? parseFloat(taxRate.rate) : 0.1; // Default 10%
        const tax = amount * rate;

        res.json({
            amount,
            taxRate: rate,
            tax,
            total: amount + tax
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTaxByRegion = async (req, res, next) => {
    try {
        const { region } = req.params;
        const taxRates = await TaxRate.findAll({
            where: { region, isActive: true }
        });
        res.json({ taxRates });
    } catch (error) {
        next(error);
    }
};
