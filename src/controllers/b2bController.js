const db = require('../models');
const B2BAccount = db.B2BAccount;
const B2BQuote = db.B2BQuote;
const B2BContract = db.B2BContract;
const PriceList = db.PriceList;
const PurchaseOrder = db.PurchaseOrder;
const Budget = db.Budget;
const User = db.User;

const b2bController = {
    // Accounts
    getAccounts: async (req, res, next) => {
        try {
            const accounts = await B2BAccount.findAll();
            res.json({ success: true, accounts });
        } catch (error) {
            next(error);
        }
    },

    createAccount: async (req, res, next) => {
        try {
            const account = await B2BAccount.create(req.body);
            res.status(201).json({ success: true, data: account });
        } catch (error) {
            next(error);
        }
    },

    getAccountById: async (req, res, next) => {
        try {
            const account = await B2BAccount.findByPk(req.params.id);
            if (!account) return res.status(404).json({ message: 'Account not found' });
            res.json({ success: true, data: account });
        } catch (error) {
            next(error);
        }
    },

    // Contracts
    getContracts: async (req, res, next) => {
        try {
            const contracts = await B2BContract.findAll({
                include: [{ model: B2BAccount, attributes: ['companyName'] }]
            });
            res.json({ success: true, contracts });
        } catch (error) {
            next(error);
        }
    },

    // Price Lists
    getPriceLists: async (req, res, next) => {
        try {
            const priceLists = await PriceList.findAll();
            res.json({ success: true, priceLists });
        } catch (error) {
            next(error);
        }
    },

    // Quotes
    createQuote: async (req, res, next) => {
        try {
            const { items, accountId, notes } = req.body;
            // Calculate total from items (mocked)
            const totalAmount = 1000.00;

            const quote = await B2BQuote.create({
                userId: req.user ? req.user.id : null,
                accountId,
                items,
                totalAmount,
                notes,
                status: 'draft'
            });

            res.status(201).json({ success: true, data: quote, message: 'Quote created' });
        } catch (error) {
            next(error);
        }
    },

    getQuotes: async (req, res, next) => {
        try {
            const quotes = await B2BQuote.findAll({
                include: [{ model: B2BAccount, attributes: ['companyName'] }]
            });
            res.json({ success: true, quotes });
        } catch (error) {
            next(error);
        }
    },

    getQuoteById: async (req, res, next) => {
        try {
            const quote = await B2BQuote.findByPk(req.params.id);
            if (!quote) return res.status(404).json({ message: 'Quote not found' });
            res.json({ success: true, data: quote });
        } catch (error) {
            next(error);
        }
    },

    approveQuote: async (req, res, next) => {
        try {
            const quote = await B2BQuote.findByPk(req.params.id);
            if (!quote) return res.status(404).json({ message: 'Quote not found' });
            await quote.update({ status: 'approved' });
            res.json({ success: true, message: 'Quote approved' });
        } catch (error) {
            next(error);
        }
    },

    rejectQuote: async (req, res, next) => {
        try {
            const quote = await B2BQuote.findByPk(req.params.id);
            if (!quote) return res.status(404).json({ message: 'Quote not found' });
            await quote.update({ status: 'rejected' });
            res.json({ success: true, message: 'Quote rejected' });
        } catch (error) {
            next(error);
        }
    },

    // Credit Limits & Payment Terms
    getCreditLimits: async (req, res, next) => {
        try {
            const accounts = await B2BAccount.findAll({
                attributes: ['id', 'companyName', 'creditLimit', 'balance']
            });
            res.json({ success: true, creditLimits: accounts });
        } catch (error) {
            next(error);
        }
    },

    getPaymentTerms: async (req, res, next) => {
        try {
            const accounts = await B2BAccount.findAll({
                attributes: ['id', 'companyName', 'paymentTerms']
            });
            res.json({ success: true, paymentTerms: accounts });
        } catch (error) {
            next(error);
        }
    },

    // Purchase Orders
    getPurchaseOrders: async (req, res, next) => {
        try {
            const pos = await PurchaseOrder.findAll({
                include: [{ model: B2BAccount, attributes: ['companyName'] }]
            });
            res.json({ success: true, purchaseOrders: pos });
        } catch (error) {
            next(error);
        }
    },

    // Approvals (General B2B approval queue)
    getApprovals: async (req, res, next) => {
        try {
            // Combine quotes and POs that need approval
            const pendingQuotes = await B2BQuote.findAll({ where: { status: 'submitted' } });
            const pendingPOs = await PurchaseOrder.findAll({ where: { status: 'pending' } });

            res.json({
                success: true,
                approvals: {
                    quotes: pendingQuotes,
                    purchaseOrders: pendingPOs
                }
            });
        } catch (error) {
            next(error);
        }
    },

    // Budgets
    getBudgets: async (req, res, next) => {
        try {
            const budgets = await Budget.findAll({
                include: [{ model: B2BAccount, attributes: ['companyName'] }]
            });
            res.json({ success: true, budgets });
        } catch (error) {
            next(error);
        }
    },

    // Quick Order
    quickOrder: async (req, res, next) => {
        try {
            const { skus } = req.body;
            res.json({ success: true, message: 'Items added to cart', count: skus ? skus.length : 0 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = b2bController;
