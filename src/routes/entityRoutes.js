const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

router.get('/', entityController.getEntities);
router.post('/', entityController.createEntity);
router.get('/:id', entityController.getEntityById);
router.put('/:id', entityController.updateEntity);
router.delete('/:id', entityController.deleteEntity);
router.post('/:id/clone', entityController.cloneEntity);
router.put('/:id/publish', entityController.publishEntity);
router.put('/:id/unpublish', entityController.unpublishEntity);
router.post('/:id/migrate', entityController.runMigration);

router.get('/:id/fields', entityController.getFields);
router.post('/:id/fields', entityController.createField);
router.put('/:id/fields/:fieldId', entityController.updateField);
router.delete('/:id/fields/:fieldId', entityController.deleteField);
router.put('/:id/fields/:fieldId/reorder', entityController.reorderFields);

router.get('/:id/relations', entityController.getRelations);
router.post('/:id/relations', entityController.createRelation);
router.delete('/:id/relations/:relId', entityController.deleteRelation);

router.get('/:id/indexes', entityController.getIndexes);
router.post('/:id/indexes', entityController.createIndex);
router.delete('/:id/indexes/:indexId', entityController.deleteIndex);

router.get('/:id/permissions', entityController.getPermissions);
router.put('/:id/permissions', entityController.updatePermissions);

router.get('/:id/forms', entityController.getForms);
router.post('/:id/forms', entityController.createForm);
router.put('/:id/forms/:formId', entityController.updateForm);
router.delete('/:id/forms/:formId', entityController.deleteForm);

router.get('/:id/views', entityController.getViews);
router.post('/:id/views', entityController.createView);
router.put('/:id/views/:viewId', entityController.updateView);
router.delete('/:id/views/:viewId', entityController.deleteView);

module.exports = router;
