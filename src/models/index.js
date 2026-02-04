const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here (will be added as we create them)
db.User = require('./User')(sequelize, Sequelize);
db.Role = require('./Role')(sequelize, Sequelize);
db.Permission = require('./Permission')(sequelize, Sequelize);
db.Address = require('./Address')(sequelize, Sequelize);
db.Session = require('./Session')(sequelize, Sequelize);

db.Product = require('./Product')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);
db.Brand = require('./Brand')(sequelize, Sequelize);
db.Collection = require('./Collection')(sequelize, Sequelize);
db.ProductVariant = require('./ProductVariant')(sequelize, Sequelize);
db.ProductImage = require('./ProductImage')(sequelize, Sequelize);
db.Tag = require('./Tag')(sequelize, Sequelize);

db.Warehouse = require('./Warehouse')(sequelize, Sequelize);
db.Inventory = require('./Inventory')(sequelize, Sequelize);
db.StockMovement = require('./StockMovement')(sequelize, Sequelize);

db.Order = require('./Order')(sequelize, Sequelize);
db.OrderItem = require('./OrderItem')(sequelize, Sequelize);
db.Cart = require('./Cart')(sequelize, Sequelize);
db.CartItem = require('./CartItem')(sequelize, Sequelize);

db.Payment = require('./Payment')(sequelize, Sequelize);
db.Shipment = require('./Shipment')(sequelize, Sequelize);
db.Shipper = require('./Shipper')(sequelize, Sequelize);
db.Coupon = require('./Coupon')(sequelize, Sequelize);
db.Promotion = require('./Promotion')(sequelize, Sequelize);

db.Vendor = require('./Vendor')(sequelize, Sequelize);
db.Invoice = require('./Invoice')(sequelize, Sequelize);
db.Payout = require('./Payout')(sequelize, Sequelize);
db.TaxRate = require('./TaxRate')(sequelize, Sequelize);
db.Ledger = require('./Ledger')(sequelize, Sequelize);

db.Workflow = require('./Workflow')(sequelize, Sequelize);
db.WorkflowState = require('./WorkflowState')(sequelize, Sequelize);
db.WorkflowTransition = require('./WorkflowTransition')(sequelize, Sequelize);
db.BusinessRule = require('./BusinessRule')(sequelize, Sequelize);

db.Page = require('./Page')(sequelize, Sequelize);
db.ContentBlock = require('./ContentBlock')(sequelize, Sequelize);
db.Report = require('./Report')(sequelize, Sequelize);
db.ReportExecution = require('./ReportExecution')(sequelize, Sequelize);
db.Dashboard = require('./Dashboard')(sequelize, Sequelize);









// Associate models
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
