const db = require('../models');
const CustomRecord = db.CustomRecord;
const RecordVersion = db.RecordVersion;
const AuditLog = db.AuditLog;

const recordController = {
    // Records
    getRecords: async (req, res, next) => {
        try {
            const entityType = req.params.entity;
            const records = await CustomRecord.findAll({
                where: { entityType, isDeleted: false }
            });
            res.json({ success: true, records });
        } catch (error) {
            next(error);
        }
    },

    createRecord: async (req, res, next) => {
        try {
            const entityType = req.params.entity;
            const { data } = req.body;

            const record = await CustomRecord.create({
                entityType,
                data,
                createdBy: req.user ? req.user.id : 'system',
                version: 1
            });

            // Create initial version
            await RecordVersion.create({
                recordId: record.id,
                versionNumber: 1,
                data: record.data,
                changedBy: req.user ? req.user.id : 'system',
                changeReason: 'Initial creation'
            });

            res.status(201).json({ success: true, record });
        } catch (error) {
            next(error);
        }
    },

    getRecordById: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });
            res.json({ success: true, record });
        } catch (error) {
            next(error);
        }
    },

    updateRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });
            if (record.isLocked) return res.status(403).json({ message: 'Record is locked' });

            const newVersionNumber = record.version + 1;
            await record.update({
                data: { ...record.data, ...req.body.data },
                version: newVersionNumber,
                updatedBy: req.user ? req.user.id : 'system'
            });

            await RecordVersion.create({
                recordId: record.id,
                versionNumber: newVersionNumber,
                data: record.data,
                changedBy: req.user ? req.user.id : 'system',
                changeReason: req.body.changeReason || 'Update'
            });

            res.json({ success: true, record });
        } catch (error) {
            next(error);
        }
    },

    deleteRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });

            // Soft delete
            await record.update({ isDeleted: true });
            res.json({ success: true, message: 'Record soft-deleted' });
        } catch (error) {
            next(error);
        }
    },

    restoreRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });

            await record.update({ isDeleted: false });
            res.json({ success: true, message: 'Record restored' });
        } catch (error) {
            next(error);
        }
    },

    cloneRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });

            const newRecord = await CustomRecord.create({
                entityType: record.entityType,
                data: record.data,
                createdBy: req.user ? req.user.id : 'system',
                version: 1
            });

            await RecordVersion.create({
                recordId: newRecord.id,
                versionNumber: 1,
                data: newRecord.data,
                changedBy: req.user ? req.user.id : 'system',
                changeReason: `Cloned from ${record.id}`
            });

            res.status(201).json({ success: true, record: newRecord });
        } catch (error) {
            next(error);
        }
    },

    lockRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });

            await record.update({
                isLocked: true,
                lockedBy: req.user ? req.user.id : 'admin'
            });
            res.json({ success: true, message: 'Record locked' });
        } catch (error) {
            next(error);
        }
    },

    unlockRecord: async (req, res, next) => {
        try {
            const record = await CustomRecord.findOne({
                where: { id: req.params.id, entityType: req.params.entity }
            });
            if (!record) return res.status(404).json({ message: 'Record not found' });

            await record.update({ isLocked: false, lockedBy: null });
            res.json({ success: true, message: 'Record unlocked' });
        } catch (error) {
            next(error);
        }
    },

    // Versioning
    getRecordVersions: async (req, res, next) => {
        try {
            const versions = await RecordVersion.findAll({
                where: { recordId: req.params.id },
                order: [['versionNumber', 'DESC']]
            });
            res.json({ success: true, versions });
        } catch (error) {
            next(error);
        }
    },

    getRecordVersion: async (req, res, next) => {
        try {
            const version = await RecordVersion.findOne({
                where: { id: req.params.versionId, recordId: req.params.id }
            });
            if (!version) return res.status(404).json({ message: 'Version not found' });
            res.json({ success: true, version });
        } catch (error) {
            next(error);
        }
    },

    rollbackRecord: async (req, res, next) => {
        try {
            const { versionId } = req.body;
            const version = await RecordVersion.findOne({
                where: { id: versionId, recordId: req.params.id }
            });
            if (!version) return res.status(404).json({ message: 'Version not found' });

            const record = await CustomRecord.findByPk(req.params.id);
            if (!record) return res.status(404).json({ message: 'Record not found' });

            const newVersionNumber = record.version + 1;
            await record.update({
                data: version.data,
                version: newVersionNumber,
                updatedBy: req.user ? req.user.id : 'system'
            });

            await RecordVersion.create({
                recordId: record.id,
                versionNumber: newVersionNumber,
                data: record.data,
                changedBy: req.user ? req.user.id : 'system',
                changeReason: `Rollback to version ${version.versionNumber}`
            });

            res.json({ success: true, record, message: 'Rollback successful' });
        } catch (error) {
            next(error);
        }
    },

    diffVersions: async (req, res, next) => {
        try {
            const { versionA, versionB } = req.params;
            const vA = await RecordVersion.findByPk(versionA);
            const vB = await RecordVersion.findByPk(versionB);

            if (!vA || !vB) return res.status(404).json({ message: 'One or both versions not found' });

            // Mock diff logic
            res.json({
                success: true,
                versionA: vA.versionNumber,
                versionB: vB.versionNumber,
                diff: {
                    added: {},
                    removed: {},
                    changed: {
                        // Example: "field": { from: vA.data.field, to: vB.data.field }
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    },

    // Audit & Approvals
    getRecordAudit: async (req, res, next) => {
        try {
            const audit = await AuditLog.findAll({
                where: {
                    entityId: req.params.id,
                    entityType: req.params.entity
                },
                order: [['createdAt', 'DESC']]
            });
            res.json({ success: true, audit });
        } catch (error) {
            next(error);
        }
    },

    getApprovals: async (req, res, next) => {
        try {
            // Mock approvals queue for this record
            res.json({ success: true, approvals: [] });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = recordController;
