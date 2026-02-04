const { B2BAccount, User } = require('../models');

class B2BService {
    /**
     * Get all B2B accounts
     */
    async getAccounts(query = {}) {
        const { status } = query;
        const where = {};

        if (status) {
            where.status = status;
        }

        const accounts = await B2BAccount.findAll({
            where,
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'email', 'firstName', 'lastName']
                }
            ],
            order: [['companyName', 'ASC']]
        });

        return accounts;
    }

    // Placeholders for other methods
    async getContracts() { return []; }
    async getPriceLists() { return []; }
    async getQuotes() { return []; }
    async approveQuote(id) { return { message: 'Quote approved' }; }
    async getCreditLimits() { return []; }
    async getPaymentTerms() { return []; }
    async getPurchaseOrders() { return []; }
    async getApprovals() { return []; }
    async getBudgets() { return []; }
}

module.exports = new B2BService();
