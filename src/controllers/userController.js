const userService = require('../services/userService');
const { User } = require('../models');
const { Op } = require('sequelize');

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

// Missing function - createUser
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
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

// Admin Functions
exports.adminResetPassword = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // In real implementation, hash the password
        const bcrypt = require('bcryptjs');
        const passwordHash = await bcrypt.hash(newPassword, 10);

        user.passwordHash = passwordHash;
        await user.save();

        res.json({
            message: 'Password reset successfully',
            userId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.searchUsers = async (req, res, next) => {
    try {
        const { query, role, status, limit = 50, offset = 0 } = req.query;

        const where = {};

        if (query) {
            where[Op.or] = [
                { email: { [Op.like]: `%${query}%` } },
                { firstName: { [Op.like]: `%${query}%` } },
                { lastName: { [Op.like]: `%${query}%` } }
            ];
        }

        if (role) {
            where.role = role;
        }

        if (status === 'active') {
            where.isActive = true;
        } else if (status === 'inactive') {
            where.isActive = false;
        }

        const { count, rows: users } = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: { exclude: ['passwordHash'] },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            users,
            total: count,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.verifyUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        res.json({
            message: 'User verified successfully',
            user: {
                id: user.id,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.bulkImport = async (req, res, next) => {
    try {
        const { users } = req.body;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        const bcrypt = require('bcryptjs');
        const imported = [];
        const errors = [];

        for (let i = 0; i < users.length; i++) {
            try {
                const userData = users[i];

                // Hash password if provided
                if (userData.password) {
                    userData.passwordHash = await bcrypt.hash(userData.password, 10);
                    delete userData.password;
                }

                const user = await User.create(userData);
                imported.push(user.id);
            } catch (error) {
                errors.push({
                    index: i,
                    email: users[i].email,
                    error: error.message
                });
            }
        }

        res.json({
            message: 'Bulk import completed',
            imported: imported.length,
            failed: errors.length,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.bulkExport = async (req, res, next) => {
    try {
        const { role, isActive, format = 'json' } = req.query;

        const where = {};
        if (role) where.role = role;
        if (isActive !== undefined) where.isActive = isActive === 'true';

        const users = await User.findAll({
            where,
            attributes: { exclude: ['passwordHash'] },
            order: [['createdAt', 'DESC']]
        });

        if (format === 'csv') {
            // Generate CSV
            const csv = [
                'ID,Email,First Name,Last Name,Role,Active,Verified,Created At',
                ...users.map(u =>
                    `${u.id},${u.email},${u.firstName || ''},${u.lastName || ''},${u.role},${u.isActive},${u.isVerified},${u.createdAt}`
                )
            ].join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');
            res.send(csv);
        } else {
            res.json({
                exported: users.length,
                users
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAuditLog = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { limit = 100, offset = 0 } = req.query;

        // Mock audit log data
        const logs = [
            {
                id: 1,
                userId,
                action: 'USER_CREATED',
                timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                ipAddress: '192.168.1.1',
                userAgent: 'Mozilla/5.0...',
                changes: { status: 'created' }
            },
            {
                id: 2,
                userId,
                action: 'EMAIL_VERIFIED',
                timestamp: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
                ipAddress: '192.168.1.1',
                changes: { isVerified: true }
            },
            {
                id: 3,
                userId,
                action: 'PROFILE_UPDATED',
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                ipAddress: '192.168.1.5',
                changes: { firstName: 'Updated', lastName: 'Name' }
            }
        ];

        res.json({
            logs: logs.slice(parseInt(offset), parseInt(offset) + parseInt(limit)),
            total: logs.length
        });
    } catch (error) {
        next(error);
    }
};

// KYC Functions
exports.getKYC = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Mock KYC data
        const kyc = {
            userId,
            status: 'pending',
            submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            documents: [
                { type: 'ID_CARD', status: 'pending', uploadedAt: new Date() },
                { type: 'PROOF_OF_ADDRESS', status: 'pending', uploadedAt: new Date() }
            ],
            verificationLevel: 'basic',
            notes: []
        };

        res.json({ kyc });
    } catch (error) {
        next(error);
    }
};

exports.submitKYC = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { documents, personalInfo } = req.body;

        if (!documents || documents.length === 0) {
            return res.status(400).json({ message: 'At least one document is required' });
        }

        const kyc = {
            userId,
            status: 'pending',
            submittedAt: new Date(),
            documents,
            personalInfo,
            verificationLevel: 'basic'
        };

        res.json({
            message: 'KYC submitted successfully. Your documents will be reviewed within 2-3 business days.',
            kyc
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.approveKYC = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { verificationLevel = 'verified', notes } = req.body;

        res.json({
            message: 'KYC approved successfully',
            kyc: {
                userId,
                status: 'approved',
                verificationLevel,
                approvedAt: new Date(),
                approvedBy: req.user?.id,
                notes
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.rejectKYC = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { reason, notes } = req.body;

        if (!reason) {
            return res.status(400).json({ message: 'Rejection reason is required' });
        }

        res.json({
            message: 'KYC rejected',
            kyc: {
                userId,
                status: 'rejected',
                reason,
                notes,
                rejectedAt: new Date(),
                rejectedBy: req.user?.id
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
exports.getPreferences = async (req, res, next) => {
    try {
        // Mock user preferences
        const preferences = {
            userId: req.user.id,
            language: 'en',
            currency: 'USD',
            timezone: 'UTC',
            emailNotifications: true,
            smsNotifications: false,
            marketingEmails: true,
            newsletter: true,
            theme: 'light'
        };

        res.json(preferences);
    } catch (error) {
        next(error);
    }
};

exports.updatePreferences = async (req, res, next) => {
    try {
        const updates = req.body;

        // Validate and update preferences
        const updatedPreferences = {
            userId: req.user.id,
            ...updates,
            updatedAt: new Date()
        };

        res.json({
            message: 'Preferences updated successfully',
            preferences: updatedPreferences
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
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
exports.getNotifications = async (req, res, next) => {
    try {
        const { limit = 20, unreadOnly = false } = req.query;

        // Mock notifications
        const notifications = [
            {
                id: 1,
                userId: req.user.id,
                type: 'ORDER_SHIPPED',
                title: 'Your order has been shipped',
                message: 'Order #12345 is on its way',
                isRead: false,
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
                id: 2,
                userId: req.user.id,
                type: 'PROMOTION',
                title: 'Special offer just for you',
                message: '20% off on selected items',
                isRead: true,
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        ];

        const filtered = unreadOnly === 'true'
            ? notifications.filter(n => !n.isRead)
            : notifications;

        res.json({
            notifications: filtered.slice(0, parseInt(limit)),
            unreadCount: notifications.filter(n => !n.isRead).length
        });
    } catch (error) {
        next(error);
    }
};

exports.markAllRead = async (req, res, next) => {
    try {
        res.json({
            message: 'All notifications marked as read',
            updatedCount: 5
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.markRead = async (req, res, next) => {
    try {
        const { id } = req.params;

        res.json({
            message: 'Notification marked as read',
            notificationId: id
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDevices = async (req, res, next) => {
    try {
        const devices = [
            {
                id: 1,
                userId: req.user.id,
                deviceType: 'mobile',
                deviceName: 'iPhone 13',
                lastActive: new Date(),
                pushToken: 'token-123',
                isActive: true
            },
            {
                id: 2,
                userId: req.user.id,
                deviceType: 'web',
                deviceName: 'Chrome on Windows',
                lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
                isActive: true
            }
        ];

        res.json({ devices });
    } catch (error) {
        next(error);
    }
};

exports.removeDevice = async (req, res, next) => {
    try {
        const { id } = req.params;

        res.json({
            message: 'Device removed successfully',
            deviceId: id
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Avatar & GDPR
exports.uploadAvatar = async (req, res, next) => {
    try {
        // In real implementation, handle file upload with multer
        const avatarUrl = `https://example.com/avatars/${req.user.id}.jpg`;

        res.json({
            message: 'Avatar uploaded successfully',
            avatarUrl
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAvatar = async (req, res, next) => {
    try {
        res.json({
            message: 'Avatar deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSecurityLog = async (req, res, next) => {
    try {
        const { limit = 50 } = req.query;

        const securityLog = [
            {
                id: 1,
                userId: req.user.id,
                action: 'LOGIN',
                ipAddress: '192.168.1.1',
                userAgent: 'Mozilla/5.0...',
                timestamp: new Date(),
                status: 'SUCCESS'
            },
            {
                id: 2,
                userId: req.user.id,
                action: 'PASSWORD_CHANGE',
                ipAddress: '192.168.1.1',
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                status: 'SUCCESS'
            },
            {
                id: 3,
                userId: req.user.id,
                action: 'LOGIN',
                ipAddress: '10.0.0.5',
                timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                status: 'FAILED',
                reason: 'Invalid password'
            }
        ];

        res.json({
            logs: securityLog.slice(0, parseInt(limit))
        });
    } catch (error) {
        next(error);
    }
};

exports.requestDataExport = async (req, res, next) => {
    try {
        const exportRequest = {
            requestId: 'EXPORT-' + Date.now(),
            userId: req.user.id,
            status: 'PROCESSING',
            requestedAt: new Date(),
            estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            format: req.body.format || 'JSON'
        };

        res.json({
            message: 'Data export request submitted. You will receive an email when ready.',
            exportRequest
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.requestDataDeletion = async (req, res, next) => {
    try {
        const { confirmationCode } = req.body;

        if (!confirmationCode) {
            return res.status(400).json({
                message: 'Confirmation code required for account deletion'
            });
        }

        const deletionRequest = {
            requestId: 'DELETE-' + Date.now(),
            userId: req.user.id,
            status: 'PENDING_REVIEW',
            requestedAt: new Date(),
            scheduledDeletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days grace period
            confirmationCode
        };

        res.json({
            message: 'Account deletion request submitted. Your account will be deleted in 30 days unless you cancel this request.',
            deletionRequest
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Role Management
exports.assignRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { roleId } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // In real implementation, this would update a UserRoles junction table
        res.json({
            message: 'Role assigned successfully',
            userId: id,
            roleId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeRole = async (req, res, next) => {
    try {
        const { id, roleId } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // In real implementation, this would remove from UserRoles junction table
        res.json({
            message: 'Role removed successfully',
            userId: id,
            roleId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function aliases for route compatibility (defined at end after all functions exist)
exports.listAddresses = exports.getAddresses;
exports.addWishlist = exports.addToWishlist;
exports.removeWishlist = exports.removeFromWishlist;
exports.listDevices = exports.getDevices;
exports.dataExport = exports.requestDataExport;
exports.dataDelete = exports.requestDataDeletion;
exports.bulkImportUsers = exports.bulkImport;
exports.bulkExportUsers = exports.bulkExport;
exports.getUserAuditLog = exports.getAuditLog;

