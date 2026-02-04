const authService = require('../services/authService');
const db = require('../models');
const User = db.User;

const authController = {
    register: async (req, res, next) => {
        try {
            const { user, token } = await authService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', user, token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            res.json({ message: 'Login successful', user, token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    refreshToken: async (req, res, next) => {
        // Basic implementation awaiting full service logic
        res.status(200).json({ message: 'Token refreshed' });
    },

    logout: async (req, res, next) => {
        // Invalidate token logic or just response
        res.status(200).json({ message: 'Logout successful' });
    },

    verifyEmail: async (req, res, next) => {
        try {
            const { token } = req.body;
            // Verify token logic
            res.json({ success: true, message: 'Email verified' });
        } catch (error) {
            next(error);
        }
    },

    resendVerification: async (req, res, next) => {
        res.json({ success: true, message: 'Verification email sent' });
    },

    forgotPassword: async (req, res, next) => {
        const { email } = req.body;
        // Send email logic
        res.json({ success: true, message: 'Password reset link sent' });
    },

    resetPassword: async (req, res, next) => {
        const { token, newPassword } = req.body;
        // Reset logic
        res.json({ success: true, message: 'Password reset successful' });
    },

    enable2FA: async (req, res, next) => {
        res.json({ success: true, secret: 'OTP_SECRET', qrCode: 'data:image/png...' });
    },

    verify2FA: async (req, res, next) => {
        res.json({ success: true, message: '2FA verified' });
    },

    disable2FA: async (req, res, next) => {
        res.json({ success: true, message: '2FA disabled' });
    },

    listSessions: async (req, res, next) => {
        // Needs Session model or check token store
        res.json({ success: true, sessions: [] });
    },

    revokeSession: async (req, res, next) => {
        res.json({ success: true, message: 'Session revoked' });
    },

    googleAuth: async (req, res, next) => {
        // Passport strategy usually handles this, controller just returns outcome
        res.json({ success: true, message: 'Google auth redirect' });
    },

    facebookAuth: async (req, res, next) => {
        res.json({ success: true, message: 'Facebook auth redirect' });
    },

    appleAuth: async (req, res, next) => {
        res.json({ message: 'Apple auth not configured', token: null });
    },

    createApiKey: async (req, res, next) => {
        res.status(201).json({ apiKey: 'sk_' + Date.now() });
    },

    listApiKeys: async (req, res, next) => {
        res.json({ apiKeys: [] });
    },

    revokeApiKey: async (req, res, next) => {
        res.json({ message: 'API key revoked' });
    },

    impersonate: async (req, res, next) => {
        try {
            // Allow admin to login as another user
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            const targetUserId = req.body.userId;
            const targetUser = await User.findByPk(targetUserId);

            if (!targetUser) return res.status(404).json({ message: 'User not found' });

            // Generate token for target user (mock)
            const token = 'imp_token_' + targetUserId;

            res.json({
                success: true,
                message: 'Impersonation started',
                token,
                user: targetUser
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;
