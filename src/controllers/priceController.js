// Price Comparison & Alerts Controller
const db = require('../models');
const Product = db.Product;

const priceController = {
    createPriceAlert: async (req, res, next) => {
        try {
            // Mock: Check if product exists
            if (req.body.productId) {
                const product = await Product.findByPk(req.body.productId);
                if (!product) return res.status(404).json({ message: 'Product not found' });
            }

            res.status(201).json({
                success: true,
                alertId: 'PA-' + Date.now(),
                productId: req.body.productId,
                targetPrice: req.body.targetPrice,
                status: 'active',
                message: 'Price alert created. You will be notified when price drops.'
            });
        } catch (error) {
            next(error);
        }
    },

    getPriceAlerts: async (req, res) => {
        // Mock list of user alerts
        res.json({
            success: true,
            alerts: [
                { id: 'PA-1', productId: 1, targetPrice: 50.00, currentPrice: 55.00, status: 'active' }
            ]
        });
    },

    deletePriceAlert: async (req, res) => {
        res.json({ success: true, message: 'Price alert deleted' });
    },

    getPriceHistory: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId);

            if (!product) return res.status(404).json({ message: 'Product not found' });

            // Generate mock history based on current price
            const currentPrice = parseFloat(product.price || 100);
            const history = [];
            for (let i = 0; i < 6; i++) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                // Random variation +/- 10%
                const variation = 1 + (Math.random() * 0.2 - 0.1);
                history.push({
                    date: date.toISOString().split('T')[0],
                    price: parseFloat((currentPrice * variation).toFixed(2))
                });
            }

            res.json({
                success: true,
                productId,
                productName: product.name,
                history: history.reverse()
            });
        } catch (error) {
            next(error);
        }
    },

    comparePrices: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId);

            if (!product) return res.status(404).json({ message: 'Product not found' });

            const price = parseFloat(product.price);

            res.json({
                success: true,
                productId,
                currentPrice: price,
                competitors: [
                    { store: 'Competitor A', price: parseFloat((price * 1.05).toFixed(2)) }, // 5% higher
                    { store: 'Competitor B', price: parseFloat((price * 0.95).toFixed(2)) }  // 5% lower
                ],
                lowestPrice: parseFloat((price * 0.95).toFixed(2)),
                averagePrice: price,
                message: 'Price is competitive'
            });
        } catch (error) {
            next(error);
        }
    },

    trackPriceChange: async (req, res) => {
        // Webhook or internal trigger to log a price change
        res.json({ success: true, message: 'Price change tracked' });
    }
};

module.exports = priceController;
