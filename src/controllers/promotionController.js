const promotionController = {
    getAllPromotions: async (req, res) => {
        res.json({ promotions: [] });
    },

    createPromotion: async (req, res) => {
        res.status(201).json({ message: 'Promotion created', id: Date.now() });
    },

    updatePromotion: async (req, res) => {
        res.json({ message: 'Promotion updated' });
    },

    deletePromotion: async (req, res) => {
        res.json({ message: 'Promotion deleted' });
    }
};

module.exports = promotionController;
