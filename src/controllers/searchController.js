const db = require('../models');
const Product = db.Product;
const { Op } = require('sequelize');

// Advanced Search & Filters Controller
const searchController = {
    advancedSearch: async (req, res, next) => {
        try {
            const {
                q,
                category,
                brand,
                minPrice,
                maxPrice,
                rating,
                sort,
                page = 1,
                limit = 20
            } = req.query;

            const where = {};
            const order = [];

            // Text search
            if (q) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${q}%` } },
                    { description: { [Op.like]: `%${q}%` } },
                    { sku: { [Op.like]: `%${q}%` } }
                ];
            }

            // Filters
            if (category) where.category = category; // Assuming category is a string or ID on Product
            if (brand) where.brand = brand;

            if (minPrice || maxPrice) {
                where.price = {};
                if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
                if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
            }

            if (rating) {
                where.rating = { [Op.gte]: parseFloat(rating) };
            }

            // Sorting
            if (sort) {
                if (sort === 'price_asc') order.push(['price', 'ASC']);
                else if (sort === 'price_desc') order.push(['price', 'DESC']);
                else if (sort === 'newest') order.push(['createdAt', 'DESC']);
                else if (sort === 'rating') order.push(['rating', 'DESC']);
            } else {
                // Default relevance/newest
                order.push(['createdAt', 'DESC']);
            }

            const offset = (page - 1) * limit;

            const { count, rows } = await Product.findAndCountAll({
                where,
                order,
                limit: parseInt(limit),
                offset: parseInt(offset),
                // attributes: ['id', 'name', 'price', 'images', 'rating', 'brand', 'category'] // Select specific fields if needed
            });

            // Mock Facets (In a real app, strict separate queries or ElasticSearch aggregations are best)
            const facets = {
                categories: ['Electronics', 'Clothing', 'Home', 'Beauty'], // Mock
                brands: ['Apple', 'Samsung', 'Nike', 'Zara'], // Mock
                priceRanges: [
                    { label: 'Under $50', count: 10 },
                    { label: '$50 - $100', count: 25 },
                    { label: '$100+', count: 15 }
                ],
                ratings: [4, 3, 2, 1]
            };

            res.json({
                success: true,
                results: rows,
                facets,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                    pages: Math.ceil(count / limit)
                }
            });

        } catch (error) {
            next(error);
        }
    },

    saveSearch: async (req, res) => {
        // Mock persistence
        res.status(201).json({
            success: true,
            searchId: 'SRCH-' + Date.now(),
            message: 'Search criteria saved successfully'
        });
    },

    getSavedSearches: async (req, res) => {
        res.json({
            success: true,
            searches: [
                { id: 'SRCH-1', query: 'laptop', filters: { minPrice: 500 } },
                { id: 'SRCH-2', query: 'summer dress', filters: { brand: 'Zara' } }
            ]
        });
    },

    deleteSavedSearch: async (req, res) => {
        res.json({ success: true, message: 'Saved search deleted' });
    },

    getSearchSuggestions: async (req, res, next) => {
        try {
            const { q } = req.query;
            if (!q || q.length < 2) {
                return res.json({ success: true, suggestions: [] });
            }

            const products = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${q}%` }
                },
                limit: 5,
                attributes: ['name']
            });

            const suggestions = products.map(p => p.name);

            res.json({
                success: true,
                suggestions
            });
        } catch (error) {
            next(error);
        }
    },

    getTrendingSearches: async (req, res) => {
        res.json({
            success: true,
            trending: ['wireless headphones', 'smart watch', 'gaming mouse', 'running shoes']
        });
    },

    trackSearch: async (req, res) => {
        // Log search event
        res.json({ success: true, message: 'Search tracked' });
    },

    getSearchAnalytics: async (req, res) => {
        res.json({
            success: true,
            topSearches: [
                { term: 'iphone 15', count: 1250 },
                { term: 'ps5', count: 980 }
            ],
            noResultsSearches: ['flying car', 'invisibility cloak'],
            avgResultsPerSearch: 42
        });
    },

    // --- AI / Dynamic Routes Stubbed ---

    getDynamicPricing: async (req, res, next) => {
        try {
            res.json({
                success: true,
                data: {
                    productId: req.query.productId,
                    optimalPrice: 99.99,
                    discount: 0.1,
                    validUntil: new Date(Date.now() + 3600000)
                }
            });
        } catch (error) {
            next(error);
        }
    },

    getFraudScore: async (req, res, next) => {
        try {
            res.json({
                success: true,
                score: 5,
                riskLevel: 'LOW',
                factors: ['IP Match', 'Billing Address Verified']
            });
        } catch (error) {
            next(error);
        }
    },

    getChurnPrediction: async (req, res, next) => {
        try {
            res.json({
                success: true,
                churnProbability: 0.15,
                segment: 'Loyal'
            });
        } catch (error) {
            next(error);
        }
    },

    getDemandForecast: async (req, res, next) => {
        try {
            res.json({
                success: true,
                forecast: [
                    { date: '2024-03-01', units: 50 },
                    { date: '2024-03-02', units: 55 }
                ]
            });
        } catch (error) {
            next(error);
        }
    },

    getRecommendations: async (req, res, next) => {
        try {
            const products = await Product.findAll({ limit: 4 });
            res.json({ success: true, recommendations: products });
        } catch (error) {
            next(error);
        }
    },

    getCartRecommendations: async (req, res, next) => {
        try {
            const products = await Product.findAll({ limit: 2 });
            res.json({ success: true, recommendations: products, reason: 'Often bought together' });
        } catch (error) {
            next(error);
        }
    },

    getUserRecommendations: async (req, res, next) => {
        try {
            const products = await Product.findAll({ limit: 4 });
            res.json({ success: true, recommendations: products, reason: 'Based on your history' });
        } catch (error) {
            next(error);
        }
    },

    getSuggestions: async (req, res, next) => {
        // Alias for getSearchSuggestions if used by different route
        return searchController.getSearchSuggestions(req, res, next);
    },

    getSynonyms: async (req, res, next) => {
        try {
            res.json({
                success: true,
                synonyms: {
                    'trousers': ['pants', 'jeans', 'slacks'],
                    'mobile': ['phone', 'smartphone', 'cellphone']
                }
            });
        } catch (error) {
            next(error);
        }
    },

    getBoostingRules: async (req, res, next) => {
        try {
            res.json({
                success: true,
                rules: [
                    { field: 'brand', value: 'OurBrand', boost: 2.0 },
                    { field: 'category', value: 'New Arrivals', boost: 1.5 }
                ]
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = searchController;
