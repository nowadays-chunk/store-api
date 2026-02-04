const { Invoice, Payout, Ledger } = require('../models');

exports.getInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.findAll();
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

exports.createInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json(invoice);
    } catch (error) {
        next(error);
    }
};

exports.getLedger = async (req, res, next) => {
    try {
        const ledger = await Ledger.findAll();
        res.json(ledger);
    } catch (error) {
        next(error);
    }
};

exports.getInvoiceById = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.calculateTax = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getTaxRates = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getCreditNotes = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getPayouts = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getReconciliation = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getVATReports = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getWithholdingTax = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
