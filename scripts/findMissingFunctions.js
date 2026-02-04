/**
 * Script to find missing controller functions
 * Run with: node scripts/findMissingFunctions.js
 */

const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, '../src/routes');
const controllersDir = path.join(__dirname, '../src/controllers');

const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('Routes.js'));

const missingFunctions = [];

routeFiles.forEach(routeFile => {
    const routePath = path.join(routesDir, routeFile);
    const routeContent = fs.readFileSync(routePath, 'utf8');

    // Extract controller name
    const controllerMatch = routeContent.match(/const\s+(\w+)\s*=\s*require\(['"]\.\.\/controllers\/(\w+)['"]\)/);
    if (!controllerMatch) return;

    const [, controllerVar, controllerName] = controllerMatch;
    const controllerPath = path.join(controllersDir, `${controllerName}.js`);

    if (!fs.existsSync(controllerPath)) {
        console.log(`⚠️  Controller not found: ${controllerName}.js`);
        return;
    }

    const controllerContent = fs.readFileSync(controllerPath, 'utf8');

    // Find all controller function calls in routes
    const functionCalls = routeContent.matchAll(new RegExp(`${controllerVar}\\.(\\w+)`, 'g'));

    for (const match of functionCalls) {
        const functionName = match[1];

        // Check if function exists in controller
        const exportPattern = new RegExp(`exports\\.${functionName}\\s*=`);
        if (!exportPattern.test(controllerContent)) {
            missingFunctions.push({
                route: routeFile,
                controller: controllerName,
                function: functionName
            });
        }
    }
});

if (missingFunctions.length === 0) {
    console.log('✅ All controller functions are defined!');
} else {
    console.log(`\n❌ Found ${missingFunctions.length} missing functions:\n`);

    const byController = {};
    missingFunctions.forEach(item => {
        if (!byController[item.controller]) {
            byController[item.controller] = [];
        }
        byController[item.controller].push(item.function);
    });

    Object.keys(byController).forEach(controller => {
        console.log(`\n${controller}.js:`);
        byController[controller].forEach(fn => {
            console.log(`  - exports.${fn}`);
        });
    });
}
