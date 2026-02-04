const { sequelize } = require('./src/models');
const fs = require('fs');

async function generateSchema() {
    try {
        let schemaSql = "-- Full SQL Schema for Store DB\n";
        schemaSql += "SET FOREIGN_KEY_CHECKS = 0;\n\n";

        // Mock query execution to capture SQL
        sequelize.query = async (sql, options) => {
            let cleanSql = sql;
            if (cleanSql.startsWith('Executing (default): ')) {
                cleanSql = cleanSql.replace('Executing (default): ', '');
            }
            if (!cleanSql.trim().endsWith(';')) cleanSql += ';';

            schemaSql += cleanSql + "\n\n";
            return [];
        };

        console.log("Generating schema...");
        await sequelize.sync({ force: true, logging: false });

        schemaSql += "SET FOREIGN_KEY_CHECKS = 1;\n";

        fs.writeFileSync('tailored-bridge-store_schema.sql', schemaSql);
        console.log("Schema saved to tailored-bridge-store_schema.sql");
        process.exit(0);

    } catch (error) {
        console.error('Error generating schema:', error);
        process.exit(1);
    }
}

generateSchema();
