const userService = require('../services/userService');

// Profile Management
exports.getProfile = async (req, res, next) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const user = await userService.updateProfile(req.user.id, req.body);
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const result = await userService.changePassword(req.user.id, currentPassword, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin User Management
const { User } = require('../models');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['passwordHash'] } });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['passwordHash'] } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.banUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isActive = false;
        await user.save();
        res.json({ message: 'User banned' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.unbanUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isActive = true;
        await user.save();
        res.json({ message: 'User unbanned' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserActivity = async (req, res, next) => {
    res.json({ activity: [] });
};

exports.getUserSessions = async (req, res, next) => {
    res.json({ sessions: [] });
};
exports.adminResetPassword = async (req, res, next) => { res.json({ message: 'Password reset' }); };
exports.searchUsers = async (req, res, next) => { res.json({ users: [] }); };
exports.verifyUser = async (req, res, next) => { res.json({ message: 'User verified' }); };
exports.bulkImport = async (req, res, next) => { res.json({ imported: 0 }); };
exports.bulkExport = async (req, res, next) => { res.json({ exported: 0 }); };
exports.getAuditLog = async (req, res, next) => { res.json({ logs: [] }); };

// KYC
exports.getKYC = async (req, res, next) => { res.json({ kyc: { status: 'pending' } }); };
exports.submitKYC = async (req, res, next) => { res.json({ message: 'KYC submitted' }); };
exports.approveKYC = async (req, res, next) => { res.json({ message: 'KYC approved' }); };
exports.rejectKYC = async (req, res, next) => { res.json({ message: 'KYC rejected' }); };

// Addresses
exports.getAddresses = async (req, res, next) => {
    try {
        const addresses = await userService.getAddresses(req.user.id);
        res.json(addresses);
    } catch (error) {
        next(error);
    }
};
exports.createAddress = async (req, res, next) => {
    try {
        const address = await userService.createAddress(req.user.id, req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateAddress = async (req, res, next) => {
    try {
        const address = await userService.updateAddress(req.user.id, req.params.id, req.body);
        res.json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteAddress = async (req, res, next) => {
    try {
        await userService.deleteAddress(req.user.id, req.params.id);
        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.setDefaultAddress = async (req, res, next) => {
    try {
        const address = await userService.setDefaultAddress(req.user.id, req.params.id);
        res.json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Preferences & Wishlist
exports.getPreferences = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.updatePreferences = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getWishlist = async (req, res, next) => {
    try {
        const wishlist = await userService.getWishlist(req.user.id);
        res.json(wishlist);
    } catch (error) {
        next(error);
    }
};
exports.addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const item = await userService.addToWishlist(req.user.id, productId);
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.removeFromWishlist = async (req, res, next) => {
    try {
        await userService.removeFromWishlist(req.user.id, req.params.productId);
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Notifications & Devices
exports.getNotifications = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.markAllRead = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.markRead = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getDevices = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.removeDevice = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };

// Avatar & GDPR
exports.uploadAvatar = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.deleteAvatar = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getSecurityLog = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.requestDataExport = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.requestDataDeletion = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
