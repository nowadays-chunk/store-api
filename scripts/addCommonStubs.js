// Common stub functions to add to controllers
const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, '../src/controllers');
const routesDir = path.join(__dirname, '../src/routes');

// Common CRUD stubs
const commonStubs = `
// Common CRUD stubs (auto-generated)
if (!exports.getAll) {
    exports.getAll = async (req, res, next) => {
        res.json({ data: [], total: 0 });
    };
}

if (!exports.getById) {
    exports.getById = async (req, res, next) => {
        res.json({ id: req.params.id });
    };
}

if (!exports.create) {
    exports.create = async (req, res, next) => {
        res.status(201).json({ id: Date.now(), message: 'Created successfully' });
    };
}

if (!exports.update) {
    exports.update = async (req, res, next) => {
        res.json({ message: 'Updated successfully' });
    };
}

if (!exports.delete) {
    exports.delete = async (req, res, next) => {
        res.json({ message: 'Deleted successfully' });
    };
}
`;

// List of controllers to add stubs to
const controllers = [
    'shippingController.js',
    'analyticsController.js',
    'brandController.js',
    'categoryController.js',
    'couponController.js',
    'promotionController.js',
    'reviewController.js',
    'wishlistController.js',
    'notificationController.js',
    'settingsController.js',
    'dashboardController.js',
    'searchController.js',
    'uploadController.js',
    'webhookController.js',
    'auditController.js',
    'roleController.js',
    'permissionController.js',
    'integrationController.js',
    'automationController.js',
    'rmaController.js',
    'supportController.js',
    'taskController.js',
    'projectController.js',
    'workflowController.js'
];

let count = 0;

controllers.forEach(controllerFile => {
    const controllerPath = path.join(controllersDir, controllerFile);

    if (fs.existsSync(controllerPath)) {
        let content = fs.readFileSync(controllerPath, 'utf8');

        // Only add if not already present
        if (!content.includes('// Common CRUD stubs')) {
            content = content.trimEnd() + '\n' + commonStubs;
            fs.writeFileSync(controllerPath, content);
            console.log(`✓ Added stubs to ${controllerFile}`);
            count++;
        }
    }
});

console.log(`\n✅ Added common stubs to ${count} controllers`);
