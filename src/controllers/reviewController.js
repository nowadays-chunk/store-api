const { Review } = require('../models');

const reviewController = {
    getProductReviews: async (req, res, next) => {
        try {
            const reviews = await Review.findAll({
                where: { productId: req.params.productId, isApproved: true },
                order: [['createdAt', 'DESC']]
            });
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    },

    createReview: async (req, res, next) => {
        try {
            const review = await Review.create({
                ...req.body,
                productId: req.params.productId,
                userId: req.user.id
            });
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const review = await Review.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!review) return res.status(404).json({ message: 'Review not found' });
            await review.update(req.body);
            res.json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const review = await Review.findOne({
                where: { id: req.params.id, userId: req.user.id }
            });
            if (!review) return res.status(404).json({ message: 'Review not found' });
            await review.destroy();
            res.json({ message: 'Review deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    approveReview: async (req, res, next) => {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) return res.status(404).json({ message: 'Review not found' });
            review.isApproved = true;
            await review.save();
            res.json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    markHelpful: async (req, res, next) => {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) return res.status(404).json({ message: 'Review not found' });
            review.helpfulCount += 1;
            await review.save();
            res.json(review);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = reviewController;
