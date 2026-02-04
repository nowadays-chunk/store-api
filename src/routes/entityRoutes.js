const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

router.get('/entities', entityController.getEntities);
router.post('/entities', entityController.createEntity);
router.get('/entities/:id', entityController.getEntityById);
router.put('/entities/:id', entityController.updateEntity);
router.delete('/entities/:id', entityController.deleteEntity);
router.post('/entities/:id/clone', entityController.cloneEntity);
router.put('/entities/:id/publish', entityController.publishEntity);
router.put('/entities/:id/unpublish', entityController.unpublishEntity);
router.post('/entities/:id/migrate', entityController.runMigration);

router.get('/entities/:id/fields', entityController.getFields);
router.post('/entities/:id/fields', entityController.createField);
router.put('/entities/:id/fields/:fieldId', entityController.updateField);
router.delete('/entities/:id/fields/:fieldId', entityController.deleteField);
router.put('/entities/:id/fields/:fieldId/reorder', entityController.reorderFields);

router.get('/entities/:id/relations', entityController.getRelations);
router.post('/entities/:id/relations', entityController.createRelation);
router.delete('/entities/:id/relations/:relId', entityController.deleteRelation);

router.get('/entities/:id/indexes', entityController.getIndexes);
router.post('/entities/:id/indexes', entityController.createIndex);
router.delete('/entities/:id/indexes/:indexId', entityController.deleteIndex);

router.get('/entities/:id/permissions', entityController.getPermissions);
router.put('/entities/:id/permissions', entityController.updatePermissions);

router.get('/entities/:id/forms', entityController.getForms);
router.post('/entities/:id/forms', entityController.createForm);
router.put('/entities/:id/forms/:formId', entityController.updateForm);
router.delete('/entities/:id/forms/:formId', entityController.deleteForm);

router.get('/entities/:id/views', entityController.getViews);
router.post('/entities/:id/views', entityController.createView);
router.put('/entities/:id/views/:viewId', entityController.updateView);
router.delete('/entities/:id/views/:viewId', entityController.deleteView);

module.exports = router;
