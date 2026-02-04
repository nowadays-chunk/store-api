const reviewService = require('../services/reviewService');

/**
 * Create review
 */
exports.createReview = async (req, res, next) => {
    try {
        const review = await reviewService.createReview(req.user.id, req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get product reviews
 */
exports.getProductReviews = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const result = await reviewService.getProductReviews(productId, req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Update review
 */
exports.updateReview = async (req, res, next) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.user.id, req.body);
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete review
 */
exports.deleteReview = async (req, res, next) => {
    try {
        const result = await reviewService.deleteReview(req.params.id, req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get user reviews
 */
exports.getUserReviews = async (req, res, next) => {
    try {
        const reviews = await reviewService.getUserReviews(req.user.id);
        res.json({ reviews });
    } catch (error) {
        next(error);
    }
};

/**
 * Approve review (admin)
 */
exports.approveReview = async (req, res, next) => {
    try {
        const review = await reviewService.approveReview(req.params.id);
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Mark review as helpful
 */
exports.markHelpful = async (req, res, next) => {
    try {
        const review = await reviewService.markHelpful(req.params.id, req.user.id);
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Report review
 */
exports.reportReview = async (req, res, next) => {
    try {
        res.json({ message: 'Review reported' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
