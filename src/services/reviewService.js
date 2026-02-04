const { Review, Product, User, sequelize } = require('../models');

class ReviewService {
    /**
     * Create review
     */
    async createReview(userId, reviewData) {
        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            where: {
                userId,
                productId: reviewData.productId
            }
        });

        if (existingReview) {
            throw new Error('You have already reviewed this product');
        }

        const review = await Review.create({
            userId,
            ...reviewData
        });

        // Update product average rating
        await this.updateProductRating(reviewData.productId);

        return review;
    }

    /**
     * Get product reviews
     */
    async getProductReviews(productId, filters = {}) {
        const { page = 1, limit = 20, rating } = filters;
        const offset = (page - 1) * limit;

        const where = { productId, isApproved: true };
        if (rating) where.rating = rating;

        const { rows: reviews, count } = await Review.findAndCountAll({
            where,
            include: [
                { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            reviews,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Update review
     */
    async updateReview(reviewId, userId, updates) {
        const review = await Review.findByPk(reviewId);
        if (!review) throw new Error('Review not found');

        if (review.userId !== userId) {
            throw new Error('Unauthorized to update this review');
        }

        await review.update(updates);

        // Update product rating
        await this.updateProductRating(review.productId);

        return review;
    }

    /**
     * Delete review
     */
    async deleteReview(reviewId, userId) {
        const review = await Review.findByPk(reviewId);
        if (!review) throw new Error('Review not found');

        if (review.userId !== userId) {
            throw new Error('Unauthorized to delete this review');
        }

        const productId = review.productId;
        await review.destroy();

        // Update product rating
        await this.updateProductRating(productId);

        return { message: 'Review deleted' };
    }

    /**
     * Approve review (admin)
     */
    async approveReview(reviewId) {
        const review = await Review.findByPk(reviewId);
        if (!review) throw new Error('Review not found');

        review.isApproved = true;
        review.approvedAt = new Date();
        await review.save();

        return review;
    }

    /**
     * Update product average rating
     */
    async updateProductRating(productId) {
        const result = await Review.findAll({
            where: { productId, isApproved: true },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'reviewCount']
            ]
        });

        const avgRating = parseFloat(result[0]?.dataValues?.avgRating || 0);
        const reviewCount = parseInt(result[0]?.dataValues?.reviewCount || 0);

        await Product.update(
            {
                averageRating: avgRating,
                reviewCount: reviewCount
            },
            { where: { id: productId } }
        );

        return { avgRating, reviewCount };
    }

    /**
     * Get user reviews
     */
    async getUserReviews(userId) {
        const reviews = await Review.findAll({
            where: { userId },
            include: [
                { model: Product, as: 'product', attributes: ['id', 'name', 'imageUrl'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        return reviews;
    }

    /**
     * Mark review as helpful
     */
    async markHelpful(reviewId, userId) {
        const review = await Review.findByPk(reviewId);
        if (!review) throw new Error('Review not found');

        review.helpfulCount = (review.helpfulCount || 0) + 1;
        await review.save();

        return review;
    }
}

module.exports = new ReviewService();
