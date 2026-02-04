const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');

// Standard routes (protected)
router.get('/me', protect, userController.getProfile);
router.put('/me', protect, userController.updateProfile);
router.put('/me/password', protect, userController.changePassword);
router.get('/me/addresses', protect, userController.listAddresses);
router.post('/me/addresses', protect, userController.createAddress);
router.put('/me/addresses/:id', protect, userController.updateAddress);
router.delete('/me/addresses/:id', protect, userController.deleteAddress);
router.put('/me/addresses/:id/default', protect, userController.setDefaultAddress);

// Admin routes (highly restricted)
router.use(protect, restrictTo('admin'));

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Admin - Bulk Operations
router.post('/bulk-import', userController.bulkImportUsers);
router.post('/bulk-export', userController.bulkExportUsers);

// Admin - User Management
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
