const db = require('../models');
const { SupportTicket, TicketResponse, KBArticle, KBCategory, SupportMacro, SLARule, User } = db;
const { Op } = require('sequelize');

const supportController = {
    // Tickets
    createTicket: async (req, res, next) => {
        try {
            const ticket = await SupportTicket.create({
                ...req.body,
                userId: req.user.id,
                status: 'OPEN'
            });
            res.status(201).json({ success: true, ticket });
        } catch (error) {
            next(error);
        }
    },

    listTickets: async (req, res, next) => {
        try {
            const { status, priority, assignedTo } = req.query;
            const where = {};

            // Scope visibility: customers see theirs, admins see all (unless filtered)
            if (req.user.role !== 'admin') {
                where.userId = req.user.id;
            } else if (assignedTo) {
                where.assignedTo = assignedTo;
            }

            if (status) where.status = status;
            if (priority) where.priority = priority;

            const tickets = await SupportTicket.findAll({
                where,
                include: [
                    { model: User, as: 'customer', attributes: ['id'] },
                    { model: User, as: 'agent', attributes: ['id'] }
                ],
                order: [['createdAt', 'DESC']]
            });
            res.json({ success: true, tickets });
        } catch (error) {
            next(error);
        }
    },

    getTicketDetails: async (req, res, next) => {
        try {
            const ticket = await SupportTicket.findByPk(req.params.id, {
                include: [
                    { model: User, as: 'customer', attributes: ['id', 'email'] },
                    { model: User, as: 'agent', attributes: ['id'] },
                    {
                        model: TicketResponse,
                        as: 'responses',
                        include: [{ model: User, as: 'user', attributes: ['id'] }]
                    }
                ]
            });

            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

            // Security check for customers
            if (req.user.role !== 'admin' && ticket.userId !== req.user.id) {
                return res.status(403).json({ message: 'Access denied' });
            }

            res.json({ success: true, ticket });
        } catch (error) {
            next(error);
        }
    },

    replyToTicket: async (req, res, next) => {
        try {
            const ticket = await SupportTicket.findByPk(req.params.id);
            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

            const response = await TicketResponse.create({
                ticketId: ticket.id,
                userId: req.user.id,
                message: req.body.message,
                isInternal: req.body.isInternal || false,
                attachments: req.body.attachments
            });

            // Update ticket status if it's an agent reply or customer reply
            const newStatus = req.user.role === 'admin' ? 'PENDING' : 'OPEN';
            await ticket.update({ status: newStatus });

            res.status(201).json({ success: true, response });
        } catch (error) {
            next(error);
        }
    },

    assignTicket: async (req, res, next) => {
        try {
            const ticket = await SupportTicket.findByPk(req.params.id);
            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

            await ticket.update({
                assignedTo: req.body.assignedTo,
                status: 'IN_PROGRESS'
            });
            res.json({ success: true, message: 'Ticket assigned', ticket });
        } catch (error) {
            next(error);
        }
    },

    closeTicket: async (req, res, next) => {
        try {
            const ticket = await SupportTicket.findByPk(req.params.id);
            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

            await ticket.update({
                status: 'CLOSED',
                closedAt: new Date()
            });
            res.json({ success: true, message: 'Ticket closed' });
        } catch (error) {
            next(error);
        }
    },

    // Knowledge Base
    getKnowledgeBase: async (req, res, next) => {
        try {
            const categories = await KBCategory.findAll({
                include: [{ model: KBArticle, as: 'articles', where: { isPublished: true }, required: false }]
            });
            res.json({ success: true, categories });
        } catch (error) {
            next(error);
        }
    },

    // Administrative / Metadata
    getMacros: async (req, res, next) => {
        try {
            const macros = await SupportMacro.findAll();
            res.json({ success: true, macros });
        } catch (error) {
            next(error);
        }
    },

    getSLARules: async (req, res, next) => {
        try {
            const rules = await SLARule.findAll({ where: { isActive: true } });
            res.json({ success: true, rules });
        } catch (error) {
            next(error);
        }
    },

    getQueues: async (req, res, next) => {
        try {
            // Mock queues based on ticket status counts
            const openCount = await SupportTicket.count({ where: { status: 'OPEN' } });
            const progressCount = await SupportTicket.count({ where: { status: 'IN_PROGRESS' } });
            const pendingCount = await SupportTicket.count({ where: { status: 'PENDING' } });

            res.json({
                success: true,
                queues: [
                    { name: 'Unassigned', count: openCount },
                    { name: 'In Progress', count: progressCount },
                    { name: 'Waiting on Customer', count: pendingCount }
                ]
            });
        } catch (error) {
            next(error);
        }
    },

    getEscalations: async (req, res, next) => {
        try {
            // Mock escalations (e.g., URGENT tickets or those exceeding SLA)
            const escalations = await SupportTicket.findAll({
                where: {
                    [Op.or]: [
                        { priority: 'URGENT' },
                        { status: 'OPEN', createdAt: { [Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
                    ]
                }
            });
            res.json({ success: true, escalations });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = supportController;
