const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// Records
router.get('/records/:entity', recordController.getRecords);
router.post('/records/:entity', recordController.createRecord);
router.get('/records/:entity/:id', recordController.getRecordById);
router.delete('/records/:entity/:id', recordController.deleteRecord);
router.post('/records/:entity/:id/restore', recordController.restoreRecord);
router.post('/records/:entity/:id/clone', recordController.cloneRecord);
router.put('/records/:entity/:id/lock', recordController.lockRecord);
router.put('/records/:entity/:id/unlock', recordController.unlockRecord);

// Versioning
router.get('/records/:entity/:id/versions', recordController.getRecordVersions);
router.get('/records/:entity/:id/versions/:versionId', recordController.getRecordVersion);
router.post('/records/:entity/:id/rollback', recordController.rollbackRecord);
router.get('/records/:entity/:id/diff/:versionA/:versionB', recordController.diffVersions);

// Audit (Record context)
router.get('/records/:entity/:id/audit', recordController.getRecordAudit);
router.get('/records/:entity/:id/approvals', recordController.getApprovals);

module.exports = router;
