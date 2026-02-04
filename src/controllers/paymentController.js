const paymentController = {
    refundPayment: async (req, res) => {
        res.json({ message: 'Payment refunded', refundId: 'REF-' + Date.now() });
    },

    getPaymentStatus: async (req, res) => {
        res.json({ status: 'completed', paymentId: req.params.id });
    },

    getPaymentHistory: async (req, res) => {
        res.json({ payments: [] });
    },

    capturePayment: async (req, res) => {
        res.json({ message: 'Payment captured' });
    },

    voidPayment: async (req, res) => {
        res.json({ message: 'Payment voided' });
    },

    handleStripeWebhook: async (req, res) => {
        res.json({ received: true });
    }
};

module.exports = paymentController;
