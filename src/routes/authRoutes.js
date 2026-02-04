const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/2fa/enable', authController.enable2FA);
router.post('/2fa/verify', authController.verify2FA);
router.post('/2fa/disable', authController.disable2FA);
router.post('/sessions', authController.listSessions); // User specified POST for list
router.delete('/sessions/:id', authController.revokeSession);
router.post('/oauth/google', authController.googleAuth);
router.post('/oauth/facebook', authController.facebookAuth);
router.post('/oauth/apple', authController.appleAuth);
router.post('/api-keys', authController.createApiKey);
router.get('/api-keys', authController.listApiKeys);
router.delete('/api-keys/:id', authController.revokeApiKey);
router.post('/impersonate', authController.impersonate);

module.exports = router;
