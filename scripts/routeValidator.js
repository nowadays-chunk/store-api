/**
 * Comprehensive Route Validator
 * This script imports all routes and controllers (simulating Express)
 * to find exactly which route handlers are undefined.
 */

const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, '../src/routes');
const controllersDir = path.join(__dirname, '../src/controllers');

const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('Routes.js'));

console.log(`🔍 Validating ${routeFiles.length} route files...\n`);

const results = [];

routeFiles.forEach(routeFile => {
    const routePath = path.join(routesDir, routeFile);
    const content = fs.readFileSync(routePath, 'utf8');

    // Extract controller require
    const controllerMatch = content.match(/const (\w+) = require\(['"]\.\.\/controllers\/(\w+)['"]\)/);
    if (!controllerMatch) {
        // console.log(`⏩ Skipping ${routeFile} (no standard controller import)`);
        return;
    }

    const [, controllerVar, controllerName] = controllerMatch;
    const controllerPath = path.join(controllersDir, `${controllerName}.js`);

    if (!fs.existsSync(controllerPath)) {
        results.push({ file: routeFile, error: `Controller NOT FOUND: ${controllerName}.js` });
        return;
    }

    let controller;
    try {
        controller = require(controllerPath);
    } catch (e) {
        results.push({ file: routeFile, error: `FAILED TO LOAD controller ${controllerName}.js: ${e.message}` });
        return;
    }

    // Find all potential mappings in route file: controllerVar.functionName
    const regex = new RegExp(`${controllerVar}\\.(\\w+)`, 'g');
    const calls = content.matchAll(regex);

    for (const match of calls) {
        const fnName = match[1];
        if (controller[fnName] === undefined) {
            results.push({
                file: routeFile,
                controller: controllerName,
                function: fnName,
                error: 'UNDEFINED callback'
            });
        }
    }
});

if (results.length === 0) {
    console.log('✅ No undefined route handlers found!');
} else {
    console.log(`❌ Found ${results.length} issues:\n`);
    results.forEach(res => {
        if (res.function) {
            console.log(`[${res.file}] ${res.controller}.${res.function} is UNDEFINED`);
        } else {
            console.log(`[${res.file}] ${res.error}`);
        }
    });
    console.log('\n');
}
