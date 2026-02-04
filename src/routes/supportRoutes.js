const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/tickets', supportController.createTicket);
router.get('/tickets', supportController.listTickets);
router.get('/tickets/:id', supportController.getTicketDetails);
router.post('/tickets/:id/reply', supportController.replyToTicket);
router.put('/tickets/:id/assign', supportController.assignTicket);
router.put('/tickets/:id/close', supportController.closeTicket);

router.get('/macros', supportController.getMacros);
router.get('/sla-rules', supportController.getSLARules);
router.get('/queues', supportController.getQueues);
router.get('/escalations', supportController.getEscalations);
router.get('/knowledge-base', supportController.getKnowledgeBase);

module.exports = router;
