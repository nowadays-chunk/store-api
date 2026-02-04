// Loyalty & Rewards Controller
const loyaltyController = {
    getPoints: async (req, res) => {
        res.json({
            userId: req.user.id,
            points: 1000,
            tier: 'gold'
        });
    },

    addPoints: async (req, res) => {
        res.json({
            message: 'Points added',
            newBalance: 1100
        });
    },

    redeemPoints: async (req, res) => {
        res.json({
            message: 'Points redeemed',
            newBalance: 900,
            reward: req.body.reward
        });
    },

    getPointsHistory: async (req, res) => {
        res.json({ history: [] });
    },

    getTiers: async (req, res) => {
        res.json({
            tiers: [
                { name: 'bronze', minPoints: 0 },
                { name: 'silver', minPoints: 500 },
                { name: 'gold', minPoints: 1000 }
            ]
        });
    },

    getRewards: async (req, res) => {
        res.json({ rewards: [] });
    },

    createReward: async (req, res) => {
        res.status(201).json({ message: 'Reward created' });
    },

    getReferralCode: async (req, res) => {
        res.json({
            code: 'REF-' + req.user.id.substring(0, 8),
            referrals: 5,
            bonusEarned: 50
        });
    },

    trackReferral: async (req, res) => {
        res.json({ message: 'Referral tracked' });
    }
};

module.exports = loyaltyController;
