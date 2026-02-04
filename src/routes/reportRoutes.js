const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReports);
router.post('/', reportController.createReport);
router.get('/templates', reportController.getTemplates);
router.post('/templates', reportController.createTemplate);

router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.post('/:id/run', reportController.runReport);
router.get('/:id/results', reportController.getReportResults);
router.post('/:id/schedule', reportController.scheduleReport);
router.get('/:id/schedules', reportController.getSchedules);
router.delete('/:id/schedules/:scheduleId', reportController.deleteSchedule);
router.post('/:id/export/pdf', reportController.exportPDF);
router.post('/:id/export/excel', reportController.exportExcel);
router.post('/:id/export/csv', reportController.exportCSV);
router.get('/:id/permissions', reportController.getPermissions);
router.put('/:id/permissions', reportController.updatePermissions);
router.get('/:id/history', reportController.getRunHistory);
router.post('/:id/clone', reportController.cloneReport);

module.exports = router;
