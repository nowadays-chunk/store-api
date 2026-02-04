// Gift Cards & Store Credit Controller
const giftCardController = {
    createGiftCard: async (req, res) => {
        res.status(201).json({
            code: 'GC-' + Date.now(),
            balance: req.body.amount,
            message: 'Gift card created'
        });
    },

    getGiftCards: async (req, res) => {
        res.json({ giftCards: [] });
    },

    checkBalance: async (req, res) => {
        res.json({
            code: req.params.code,
            balance: 50.00,
            isActive: true
        });
    },

    redeemGiftCard: async (req, res) => {
        res.json({
            message: 'Gift card redeemed',
            amountApplied: req.body.amount,
            remainingBalance: 25.00
        });
    },

    deactivateGiftCard: async (req, res) => {
        res.json({ message: 'Gift card deactivated' });
    },

    getGiftCardHistory: async (req, res) => {
        res.json({ history: [] });
    },

    // Store Credit
    addStoreCredit: async (req, res) => {
        res.json({
            message: 'Store credit added',
            newBalance: req.body.amount
        });
    },

    getStoreCredit: async (req, res) => {
        res.json({
            userId: req.user.id,
            balance: 100.00
        });
    },

    useStoreCredit: async (req, res) => {
        res.json({
            message: 'Store credit applied',
            amountUsed: req.body.amount
        });
    }
};

module.exports = giftCardController;
