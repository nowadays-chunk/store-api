const { User } = require('../models');
const bcrypt = require('bcryptjs');

class UserService {
    async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['passwordHash'] }
        });
        if (!user) throw new Error('User not found');
        return user;
    }

    async updateProfile(userId, updates) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const { firstName, lastName, email } = updates;
        await user.update({ firstName, lastName, email });

        return { ...user.toJSON(), passwordHash: undefined };
    }

    async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) throw new Error('Current password is incorrect');

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await user.update({ passwordHash });

        return { message: 'Password updated successfully' };
    }

    async deleteUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        await user.destroy();
        return { message: 'User deleted successfully' };
    }

    // Address Management
    async getAddresses(userId) {
        const { Address } = require('../models');
        return await Address.findAll({ where: { userId } });
    }

    async createAddress(userId, addressData) {
        const { Address } = require('../models');
        return await Address.create({ ...addressData, userId });
    }

    async updateAddress(userId, addressId, addressData) {
        const { Address } = require('../models');
        const address = await Address.findOne({ where: { id: addressId, userId } });
        if (!address) throw new Error('Address not found');
        await address.update(addressData);
        return address;
    }

    async deleteAddress(userId, addressId) {
        const { Address } = require('../models');
        await Address.destroy({ where: { id: addressId, userId } });
        return { message: 'Address deleted' };
    }

    async setDefaultAddress(userId, addressId) {
        const { Address } = require('../models');
        await Address.update({ isDefault: false }, { where: { userId } });
        const address = await Address.findOne({ where: { id: addressId, userId } });
        if (!address) throw new Error('Address not found');
        address.isDefault = true;
        await address.save();
        return address;
    }

    // Wishlist
    async getWishlist(userId) {
        const { Wishlist, Product } = require('../models');
        return await Wishlist.findAll({
            where: { userId },
            include: [{ model: Product, as: 'product' }]
        });
    }

    async addToWishlist(userId, productId) {
        const { Wishlist } = require('../models');
        const existing = await Wishlist.findOne({ where: { userId, productId } });
        if (existing) return existing;
        return await Wishlist.create({ userId, productId });
    }

    async removeFromWishlist(userId, productId) {
        const { Wishlist } = require('../models');
        await Wishlist.destroy({ where: { userId, productId } });
        return { message: 'Removed from wishlist' };
    }
}

module.exports = new UserService();
