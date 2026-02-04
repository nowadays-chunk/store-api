const db = require('../models');
const EntityDefinition = db.EntityDefinition;
const EntityField = db.EntityField;

// Entity Designer Controller - Dynamic Schema Management
exports.getEntities = async (req, res, next) => {
    try {
        const entities = await EntityDefinition.findAll({ include: ['fields'] });
        res.json({ success: true, entities });
    } catch (error) {
        next(error);
    }
};

exports.createEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.create(req.body);
        res.status(201).json({ success: true, data: entity, message: 'Entity definition created' });
    } catch (error) {
        next(error);
    }
};

exports.getEntityById = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id, { include: ['fields'] });
        if (!entity) return res.status(404).json({ message: 'Entity not found' });
        res.json({ success: true, data: entity });
    } catch (error) {
        next(error);
    }
};

exports.updateEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ message: 'Entity not found' });
        await entity.update(req.body);
        res.json({ success: true, data: entity, message: 'Entity updated' });
    } catch (error) {
        next(error);
    }
};

exports.deleteEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ message: 'Entity not found' });
        if (entity.isSystem) return res.status(403).json({ message: 'Cannot delete system entity' });

        await entity.destroy();
        res.json({ success: true, message: 'Entity deleted' });
    } catch (error) {
        next(error);
    }
};

exports.cloneEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id, { include: ['fields'] });
        if (!entity) return res.status(404).json({ message: 'Entity not found' });

        const newEntityData = entity.toJSON();
        delete newEntityData.id;
        newEntityData.name = newEntityData.name + ' (Copy)';
        newEntityData.slug = newEntityData.slug + '-copy';

        const newEntity = await EntityDefinition.create(newEntityData);

        // Clone fields
        if (newEntityData.fields && newEntityData.fields.length > 0) {
            const fields = newEntityData.fields.map(f => ({
                ...f,
                id: undefined,
                entityId: newEntity.id
            }));
            await EntityField.bulkCreate(fields);
        }

        res.status(201).json({ success: true, data: newEntity, message: 'Entity cloned' });
    } catch (error) {
        next(error);
    }
};

exports.publishEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ message: 'Entity not found' });
        await entity.update({ isPublished: true });
        res.json({ success: true, message: 'Entity published' });
    } catch (error) {
        next(error);
    }
};

exports.unpublishEntity = async (req, res, next) => {
    try {
        const entity = await EntityDefinition.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ message: 'Entity not found' });
        await entity.update({ isPublished: false });
        res.json({ success: true, message: 'Entity unpublished' });
    } catch (error) {
        next(error);
    }
};

// Fields
exports.getFields = async (req, res, next) => {
    try {
        // Can filter by entity in query ?entityId=...
        const where = {};
        if (req.params.id) where.entityId = req.params.id; // if routed as /entities/:id/fields
        const fields = await EntityField.findAll({ where, order: [['order', 'ASC']] });
        res.json({ success: true, fields });
    } catch (error) {
        next(error);
    }
};

exports.createField = async (req, res, next) => {
    try {
        const field = await EntityField.create({ ...req.body, entityId: req.params.id });
        res.status(201).json({ success: true, data: field, message: 'Field created' });
    } catch (error) {
        next(error);
    }
};

exports.updateField = async (req, res, next) => {
    try {
        const field = await EntityField.findByPk(req.params.fieldId);
        if (!field) return res.status(404).json({ message: 'Field not found' });
        await field.update(req.body);
        res.json({ success: true, data: field, message: 'Field updated' });
    } catch (error) {
        next(error);
    }
};

exports.deleteField = async (req, res, next) => {
    try {
        const field = await EntityField.findByPk(req.params.fieldId);
        if (!field) return res.status(404).json({ message: 'Field not found' });
        await field.destroy();
        res.json({ success: true, message: 'Field deleted' });
    } catch (error) {
        next(error);
    }
};

exports.reorderFields = async (req, res, next) => {
    // Expects [{ id, order }]
    try {
        const updates = req.body.updates || [];
        for (const update of updates) {
            await EntityField.update({ order: update.order }, { where: { id: update.id } });
        }
        res.json({ success: true, message: 'Fields reordered' });
    } catch (error) {
        next(error);
    }
};

// Relations (Mocked as separate logic or part of fields)
exports.getRelations = async (req, res, next) => {
    res.json({ success: true, relations: [] });
};

exports.createRelation = async (req, res, next) => {
    res.status(201).json({ success: true, message: 'Relation created (Mock)' });
};

exports.deleteRelation = async (req, res, next) => {
    res.json({ success: true, message: 'Relation deleted (Mock)' });
};

// Indexes
exports.getIndexes = async (req, res, next) => {
    res.json({ success: true, indexes: [] });
};

exports.createIndex = async (req, res, next) => {
    res.status(201).json({ success: true, message: 'Index created (Mock)' });
};

exports.deleteIndex = async (req, res, next) => {
    res.json({ success: true, message: 'Index deleted (Mock)' });
};

// Permissions
exports.getPermissions = async (req, res, next) => {
    res.json({ success: true, permissions: [] });
};

exports.updatePermissions = async (req, res, next) => {
    res.json({ success: true, message: 'Permissions updated (Mock)' });
};

// Forms
exports.getForms = async (req, res, next) => {
    res.json({ success: true, forms: [] });
};

exports.createForm = async (req, res, next) => {
    res.status(201).json({ success: true, message: 'Form created (Mock)' });
};

exports.updateForm = async (req, res, next) => {
    res.json({ success: true, message: 'Form updated (Mock)' });
};

exports.deleteForm = async (req, res, next) => {
    res.json({ success: true, message: 'Form deleted (Mock)' });
};

// Views
exports.getViews = async (req, res, next) => {
    res.json({ success: true, views: [] });
};

exports.createView = async (req, res, next) => {
    res.status(201).json({ success: true, message: 'View created (Mock)' });
};

exports.updateView = async (req, res, next) => {
    res.json({ success: true, message: 'View updated (Mock)' });
};

exports.deleteView = async (req, res, next) => {
    res.json({ success: true, message: 'View deleted (Mock)' });
};

// Migration
exports.runMigration = async (req, res, next) => {
    // Heavy operation: altering DB schema based on Entity Definitions.
    // Dangerous to implement automatically without migration engine.
    res.json({
        success: true,
        message: 'Migration simulation completed. DB schema update skipped for safety.',
        migrationId: 'MIG-' + Date.now()
    });
};
