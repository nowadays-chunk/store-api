const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration for MySQL 8
const sequelize = new Sequelize(
    process.env.DB_NAME || 'tailored_bridge_store_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'P@ssw0rd',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: false,
            freezeTableName: false
        }
    }
);

// Test connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connection established successfully.');
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err.message);
    });

module.exports = sequelize;
