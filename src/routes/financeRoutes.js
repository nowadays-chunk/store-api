const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.get('/taxes/calculate', financeController.calculateTax);
router.get('/tax-rates', financeController.getTaxRates);
router.get('/invoices', financeController.getInvoices);
router.get('/invoices/:id', financeController.getInvoiceById);
router.post('/invoices', financeController.createInvoice);
router.get('/credit-notes', financeController.getCreditNotes);
router.get('/ledger', financeController.getLedger);
router.get('/payouts', financeController.getPayouts);
router.get('/reconciliation', financeController.getReconciliation);
router.get('/vat-reports', financeController.getVATReports);
router.get('/withholding', financeController.getWithholdingTax);

module.exports = router;
