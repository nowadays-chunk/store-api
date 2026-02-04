/**
 * Support Controller
 * Handles customer support tickets
 */

exports.getTickets = async (req, res, next) => {
    try {
        const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
        const tickets = await SupportTicket.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });
        res.json({ tickets });
    } catch (error) {
        next(error);
    }
};

exports.getTicketById = async (req, res, next) => {
    try {
        const ticket = await SupportTicket.findByPk(req.params.id, {
            include: ['replies']
        });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        next(error);
    }
};

exports.createTicket = async (req, res, next) => {
    try {
        const ticket = await SupportTicket.create({
            userId: req.user.id,
            ...req.body,
            status: 'OPEN'
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTicket = async (req, res, next) => {
    try {
        const ticket = await SupportTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        await ticket.update(req.body);
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.closeTicket = async (req, res, next) => {
    try {
        const ticket = await SupportTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        ticket.status = 'CLOSED';
        ticket.closedAt = new Date();
        await ticket.save();

        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addReply = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;

        const reply = await TicketReply.create({
            ticketId,
            userId: req.user.id,
            message
        });

        res.status(201).json(reply);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.assignTicket = async (req, res, next) => {
    try {
        const ticket = await SupportTicket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        ticket.assignedTo = req.body.userId;
        ticket.status = 'IN_PROGRESS';
        await ticket.save();

        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
