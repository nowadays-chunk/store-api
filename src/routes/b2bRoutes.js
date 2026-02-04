const express = require('express');
const router = express.Router();
const b2bController = require('../controllers/b2bController');

router.get('/accounts', b2bController.getAccounts);
router.get('/contracts', b2bController.getContracts);
router.get('/price-lists', b2bController.getPriceLists);
router.get('/quotes', b2bController.getQuotes);
router.put('/quotes/:id/approve', b2bController.approveQuote);
router.get('/credit-limits', b2bController.getCreditLimits);
router.get('/payment-terms', b2bController.getPaymentTerms);
router.get('/purchase-orders', b2bController.getPurchaseOrders);
router.get('/approvals', b2bController.getApprovals);
router.get('/budgets', b2bController.getBudgets);

module.exports = router;
