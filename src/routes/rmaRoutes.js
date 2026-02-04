const express = require('express');
const router = express.Router();
const rmaController = require('../controllers/rmaController');

router.get('/', rmaController.getAllRMAs);
router.post('/', rmaController.createRMA);
router.get('/reasons', rmaController.getReturnReasons);
router.get('/labels', rmaController.getReturnLabels);
router.get('/inspections', rmaController.getInspections);
router.get('/disposals', rmaController.getDisposals);

router.get('/:id', rmaController.getRMADetails);
router.put('/:id/approve', rmaController.approveRMA);
router.put('/:id/reject', rmaController.rejectRMA);
router.put('/:id/receive', rmaController.receiveRMAItem);
router.post('/:id/refund', rmaController.refundRMA);

module.exports = router;
