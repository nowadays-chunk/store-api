const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.listRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

// Role Permissions
router.post('/:id/permissions', roleController.assignPermissions);
router.delete('/:id/permissions/:permId', roleController.removePermission);

module.exports = router;
