const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

// Domain Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const financeRoutes = require('./routes/financeRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const roleRoutes = require('./routes/roleRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const couponRoutes = require('./routes/couponRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const searchRoutes = require('./routes/searchRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const supportRoutes = require('./routes/supportRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const rmaRoutes = require('./routes/rmaRoutes');
const complianceRoutes = require('./routes/complianceRoutes');
const legalRoutes = require('./routes/legalRoutes');
const integrationRoutes = require('./routes/integrationRoutes');
const etlRoutes = require('./routes/etlRoutes');
const b2bRoutes = require('./routes/b2bRoutes');
const adminRoutes = require('./routes/adminRoutes');
const i18nRoutes = require('./routes/i18nRoutes');
const channelRoutes = require('./routes/channelRoutes');
const storeRoutes = require('./routes/storeRoutes');
const entityRoutes = require('./routes/entityRoutes');
const recordRoutes = require('./routes/recordRoutes');
const auditRoutes = require('./routes/auditRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const biRoutes = require('./routes/biRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const slaRoutes = require('./routes/projectRoutes');
const automationRoutes = require('./routes/automationRoutes');
const adminHubRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(compression()); // Compress responses

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting (Basic)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// API Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Moroccan Store API' });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/brands', require('./routes/brandRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/shippers', require('./routes/shipperRoutes'));
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/orders', orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/payments', paymentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/workflow', workflowRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/reports', reportRoutes); // Public reports? Or admin only? Leaving as was.
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/roles', roleRoutes);
app.get('/api/permissions', require('./controllers/permissionController').getAllPermissions); // Keep for backwards compatibility if needed, but primarily in admin hub now
app.use('/api/shipping', shippingRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/rma', rmaRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/etl', etlRoutes);
app.use('/api/b2b', b2bRoutes);
app.use('/api/admin', adminHubRoutes);
app.use('/api/i18n', i18nRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/bi', biRoutes);
app.use('/api', taskRoutes);         // /api/tasks
app.use('/api', projectRoutes);      // /api/projects
app.use('/api/sla', slaRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/collections', require('./routes/collectionRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

module.exports = app;
