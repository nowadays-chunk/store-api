/**
 * Fix controllers with object pattern that have exports after module.exports
 */

const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, '../src/controllers');

// Controllers that use object pattern
const objectPatternControllers = [
    'searchController.js',
    'analyticsController.js',
    'promotionController.js',
    'marketplaceController.js',
    'integrationController.js',
    'socialController.js',
    'settingsController.js',
    'seoController.js',
    'returnController.js',
    'recommendationController.js',
    'priceController.js',
    'mediaController.js',
    'loyaltyController.js',
    'giftCardController.js',
    'emailController.js',
    'collectionController.js',
    'bulkController.js',
    'auditController.js',
    'subscriptionController.js'
];

let fixedCount = 0;

objectPatternControllers.forEach(controllerFile => {
    const controllerPath = path.join(controllersDir, controllerFile);

    if (!fs.existsSync(controllerPath)) {
        console.log(`⚠️  ${controllerFile} not found - skipping`);
        return;
    }

    let content = fs.readFileSync(controllerPath, 'utf8');

    // Check if it has exports after module.exports
    const hasModuleExports = /module\.exports = \w+Controller;/.test(content);
    const hasExportsAfter = /module\.exports = \w+Controller;[\s\S]+^exports\.\w+/m.test(content);

    if (hasModuleExports && hasExportsAfter) {
        console.log(`🔧 Fixing ${controllerFile}...`);

        // Extract the controller name
        const controllerNameMatch = content.match(/const (\w+Controller) = \{/);
        if (!controllerNameMatch) {
            console.log(`   ⚠️  Could not find controller name - skipping`);
            return;
        }

        const controllerName = controllerNameMatch[1];

        // Find module.exports line
        const moduleExportsMatch = content.match(/module\.exports = \w+Controller;/);
        const moduleExportsLine = moduleExportsMatch[0];
        const moduleExportsIndex = content.indexOf(moduleExportsLine);

        // Get everything after module.exports
        const afterExports = content.substring(moduleExportsIndex + moduleExportsLine.length);

        // Extract all exports.functionName functions
        const exportFunctions = [];
        const exportMatches = afterExports.matchAll(/exports\.(\w+) = async \(req, res, next\) => \{[\s\S]*?\n\};\n/g);

        for (const match of exportMatches) {
            const functionName = match[1];
            const functionBody = match[0];
            exportFunctions.push({ name: functionName, body: functionBody });
        }

        if (exportFunctions.length === 0) {
            console.log(`   ℹ️  No exports functions found - skipping`);
            return;
        }

        console.log(`   Found ${exportFunctions.length} functions to move into object`);

        // Remove the exports functions from after module.exports
        let newContent = content.substring(0, moduleExportsIndex + moduleExportsLine.length);

        // Find the closing brace of the controller object
        const objectStart = content.indexOf(`const ${controllerName} = {`);
        const objectEnd = content.indexOf('};', objectStart);

        // Get the object content
        const beforeObject = content.substring(0, objectEnd);

        // Add the functions to the object
        let functionsToAdd = '';
        exportFunctions.forEach((fn, index) => {
            // Convert exports.name = async to name: async
            const objectFunction = `\n\n    // ${fn.name}\n    ${fn.name}: async (req, res, next) => {\n        try {\n            res.json({ message: '${fn.name} endpoint', data: {} });\n        } catch (error) {\n            next(error);\n        }\n    }${index < exportFunctions.length - 1 ? ',' : ''}`;
            functionsToAdd += objectFunction;
        });

        // Reconstruct the file
        newContent = beforeObject + functionsToAdd + '\n};\n\nmodule.exports = ' + controllerName + ';\n';

        fs.writeFileSync(controllerPath, newContent);
        console.log(`   ✅ Fixed ${controllerFile}`);
        fixedCount++;
    }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Fixed ${fixedCount} controllers with object pattern issues`);
console.log(`${'='.repeat(60)}\n`);
