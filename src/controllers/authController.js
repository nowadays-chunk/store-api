const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.refreshToken = async (req, res, next) => {
    // Basic implementation awaiting full service logic
    res.status(200).json({ message: 'Token refreshed' });
};

// ... keep other stubs for now ...
exports.logout = async (req, res, next) => { res.status(200).json({ message: 'Logout successful' }); };
exports.verifyEmail = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.resendVerification = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.forgotPassword = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.resetPassword = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.enable2FA = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.verify2FA = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.disable2FA = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.listSessions = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.revokeSession = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.googleAuth = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.facebookAuth = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.appleAuth = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.createApiKey = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.listApiKeys = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.revokeApiKey = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.impersonate = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
