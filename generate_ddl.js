const fs = require('fs');
const path = require('path');
const { sequelize } = require('./src/models');

async function generateDDL() {
    try {
        console.log('Generating Database Schema SQL...');

        const queryGenerator = sequelize.dialect.queryGenerator;
        let sqlOutput = "-- Auto-generated Schema DDL\n";
        sqlOutput += "SET FOREIGN_KEY_CHECKS = 0;\n\n";

        const models = sequelize.models; // object of modelName -> ModelClass
        const sortedModelNames = Object.keys(models).sort();

        for (const modelName of sortedModelNames) {
            const model = models[modelName];
            const tableName = model.getTableName();

            // Transform attributes to SQL definitions
            const attributes = model.tableAttributes;
            const sqlAttributes = queryGenerator.attributesToSQL(attributes, {
                table: tableName,
                context: 'createTable'
            });

            // generate createTableQuery
            const sql = queryGenerator.createTableQuery(tableName, sqlAttributes, model.options);

            sqlOutput += `-- Table: ${tableName}\n`;
            sqlOutput += `${sql}\n\n`;
        }

        sqlOutput += "SET FOREIGN_KEY_CHECKS = 1;\n";

        const outputPath = path.join(__dirname, 'full_schema.sql');
        fs.writeFileSync(outputPath, sqlOutput);

        console.log(`Schema successfully generated at: ${outputPath}`);
        process.exit(0);
    } catch (error) {
        console.error('Error generating DDL:', error);
        process.exit(1);
    }
}

generateDDL();
