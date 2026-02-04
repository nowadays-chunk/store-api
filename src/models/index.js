const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models - they export Sequelize models directly
db.User = require('./User');
db.Role = require('./Role');
db.Permission = require('./Permission');
db.Address = require('./Address');
db.Session = require('./Session');

db.Product = require('./Product');
db.Category = require('./Category');
db.Brand = require('./Brand');
db.Collection = require('./Collection');
db.ProductVariant = require('./ProductVariant');
db.ProductImage = require('./ProductImage');
db.Tag = require('./Tag');

db.Warehouse = require('./Warehouse');
db.Inventory = require('./Inventory');
db.StockMovement = require('./StockMovement');

db.Order = require('./Order');
db.OrderItem = require('./OrderItem');
db.Cart = require('./Cart');
db.CartItem = require('./CartItem');

db.Payment = require('./Payment');
db.Shipment = require('./Shipment');
db.Shipper = require('./Shipper');
db.Coupon = require('./Coupon');
db.Promotion = require('./Promotion');

db.Vendor = require('./Vendor');
db.Invoice = require('./Invoice');
db.Payout = require('./Payout');
db.TaxRate = require('./TaxRate');
db.Ledger = require('./Ledger');

db.Workflow = require('./Workflow');
db.WorkflowState = require('./WorkflowState');
db.WorkflowTransition = require('./WorkflowTransition');
db.BusinessRule = require('./BusinessRule');

db.Page = require('./Page');
db.ContentBlock = require('./ContentBlock');
db.Report = require('./Report');
db.ReportExecution = require('./ReportExecution');
db.Dashboard = require('./Dashboard');

db.Review = require('./Review');
db.Notification = require('./Notification');

// Associate models
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
