const { Cart, CartItem } = require('../models/Cart');
const { Product } = require('../models');

class CartService {
    async getCart(userId) {
        let cart = await Cart.findOne({
            where: { userId },
            include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }]
        });

        if (!cart) {
            cart = await Cart.create({ userId, subtotal: 0, total: 0 });
        }

        return cart;
    }

    async addItem(userId, productId, quantity = 1) {
        const cart = await this.getCart(userId);
        const product = await Product.findByPk(productId);

        if (!product) throw new Error('Product not found');

        // Check if item already exists
        let cartItem = await CartItem.findOne({
            where: { cartId: cart.id, productId }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
                price: product.price
            });
        }

        await this.recalculateCart(cart.id);
        return this.getCart(userId);
    }

    async updateItem(userId, itemId, quantity) {
        const cart = await this.getCart(userId);
        const item = await CartItem.findOne({
            where: { id: itemId, cartId: cart.id }
        });

        if (!item) throw new Error('Cart item not found');

        if (quantity <= 0) {
            await item.destroy();
        } else {
            item.quantity = quantity;
            await item.save();
        }

        await this.recalculateCart(cart.id);
        return this.getCart(userId);
    }

    async removeItem(userId, itemId) {
        const cart = await this.getCart(userId);
        await CartItem.destroy({
            where: { id: itemId, cartId: cart.id }
        });

        await this.recalculateCart(cart.id);
        return this.getCart(userId);
    }

    async clearCart(userId) {
        const cart = await this.getCart(userId);
        await CartItem.destroy({ where: { cartId: cart.id } });
        cart.subtotal = 0;
        cart.total = 0;
        cart.discount = 0;
        cart.couponCode = null;
        await cart.save();
        return cart;
    }

    async applyCoupon(userId, couponCode) {
        const cart = await this.getCart(userId);
        // Simple 10% discount for demo
        cart.couponCode = couponCode;
        cart.discount = cart.subtotal * 0.1;
        cart.total = cart.subtotal - cart.discount;
        await cart.save();
        return cart;
    }

    async recalculateCart(cartId) {
        const cart = await Cart.findByPk(cartId, {
            include: [{ model: CartItem, as: 'items' }]
        });

        let subtotal = 0;
        for (const item of cart.items || []) {
            subtotal += parseFloat(item.price) * item.quantity;
        }

        cart.subtotal = subtotal;
        cart.total = subtotal - (cart.discount || 0);
        await cart.save();
    }
}

module.exports = new CartService();
