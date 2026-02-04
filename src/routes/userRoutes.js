const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Standard routes
router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);

// Admin routes (should have auth/admin middleware)
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Profile & Account Settings
router.put('/me/password', userController.changePassword);
router.get('/me/addresses', userController.listAddresses);
router.post('/me/addresses', userController.createAddress);
router.put('/me/addresses/:id', userController.updateAddress);
router.delete('/me/addresses/:id', userController.deleteAddress);
router.put('/me/addresses/:id/default', userController.setDefaultAddress);
router.get('/me/preferences', userController.getPreferences);
router.put('/me/preferences', userController.updatePreferences);
router.get('/me/wishlist', userController.getWishlist);
router.post('/me/wishlist', userController.addWishlist);
router.delete('/me/wishlist/:productId', userController.removeWishlist);
router.get('/me/notifications', userController.getNotifications);
router.put('/me/notifications/read-all', userController.markAllRead);
router.put('/me/notifications/:id/read', userController.markRead);
router.get('/me/devices', userController.listDevices);
router.delete('/me/devices/:id', userController.removeDevice);
router.post('/me/avatar', userController.uploadAvatar);
router.delete('/me/avatar', userController.deleteAvatar);
router.get('/me/security-log', userController.getSecurityLog);
router.post('/me/data-export', userController.dataExport);
router.post('/me/data-delete', userController.dataDelete);

// Admin Routes - Bulk & Search & Specific
router.get('/search', userController.searchUsers); // Must be before /:id to not be caught by :id param
router.post('/bulk-import', userController.bulkImportUsers);
router.post('/bulk-export', userController.bulkExportUsers);

// Admin Routes - User Specific
router.put('/:id/ban', userController.banUser);
router.put('/:id/unban', userController.unbanUser);
router.get('/:id/activity', userController.getUserActivity);
router.get('/:id/sessions', userController.getUserSessions);
router.post('/:id/reset-password', userController.adminResetPassword);
router.post('/:id/roles', userController.assignRole);
router.delete('/:id/roles/:roleId', userController.removeRole);
router.get('/:id/audit-log', userController.getUserAuditLog);
router.put('/:id/verify', userController.verifyUser);
router.get('/:id/kyc', userController.getKYC);
router.post('/:id/kyc', userController.submitKYC);
router.put('/:id/kyc/approve', userController.approveKYC);
router.put('/:id/kyc/reject', userController.rejectKYC);

module.exports = router;
