const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models - they export Sequelize models directly
// Import models
const models = [
    'User', 'Role', 'Permission', 'Address', 'Session',
    'Product', 'Category', 'Brand', 'Collection', 'ProductVariant', 'ProductImage', 'Tag',
    'Warehouse', 'Inventory', 'StockMovement',
    'Order', 'OrderItem', 'Cart', 'CartItem',
    'Payment', 'Shipment', 'Shipper', 'Coupon', 'Promotion',
    'Vendor', 'Invoice', 'Payout', 'TaxRate', 'Ledger',
    'Workflow', 'WorkflowState', 'WorkflowTransition', 'BusinessRule',
    'Page', 'ContentBlock', 'Report', 'ReportExecution', 'Dashboard',
    'Review', 'Notification', 'B2BAccount',
    'Project', 'Task', 'Channel', 'Store', 'ComplianceRequest', 'GiftCard', 'EntityDefinition', 'EntityField',
    'AuditLog', 'BulkOperation', 'Dataset', 'AnalyticsEvent', 'B2BQuote', 'CustomRecord',
    'B2BContract', 'PriceList', 'PurchaseOrder', 'Budget', 'RecordVersion',
    'WorkflowRun', 'WorkflowLog',
    'SupportTicket', 'TicketResponse', 'KBArticle', 'KBCategory', 'SupportMacro', 'SLARule'
];

models.forEach(modelFile => {
    const modelExport = require(`./${modelFile}`);
    // If it's a function but NOT a sequelize model already, it's a factory pattern
    if (typeof modelExport === 'function' && !modelExport.sequelize) {
        db[modelFile] = modelExport(sequelize, Sequelize.DataTypes);
    } else {
        db[modelFile] = modelExport;
    }
});

// Associate models
Object.keys(db).forEach(modelName => {
    if (db[modelName] && db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
