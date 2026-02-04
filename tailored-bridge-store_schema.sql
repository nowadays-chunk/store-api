-- Full SQL Schema for Moroccan Store
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `ProductTags`;

DROP TABLE IF EXISTS `ProductCollections`;

DROP TABLE IF EXISTS `RolePermissions`;

DROP TABLE IF EXISTS `UserRoles`;

DROP TABLE IF EXISTS `sla_rules`;

DROP TABLE IF EXISTS `support_macros`;

DROP TABLE IF EXISTS `kb_articles`;

DROP TABLE IF EXISTS `kb_categories`;

DROP TABLE IF EXISTS `ticket_responses`;

DROP TABLE IF EXISTS `support_tickets`;

DROP TABLE IF EXISTS `WorkflowLogs`;

DROP TABLE IF EXISTS `WorkflowRuns`;

DROP TABLE IF EXISTS `record_versions`;

DROP TABLE IF EXISTS `budgets`;

DROP TABLE IF EXISTS `purchase_orders`;

DROP TABLE IF EXISTS `price_lists`;

DROP TABLE IF EXISTS `b2b_contracts`;

DROP TABLE IF EXISTS `custom_records`;

DROP TABLE IF EXISTS `analytics_events`;

DROP TABLE IF EXISTS `datasets`;

DROP TABLE IF EXISTS `BulkOperations`;

DROP TABLE IF EXISTS `audit_logs`;

DROP TABLE IF EXISTS `entity_fields`;

DROP TABLE IF EXISTS `entity_definitions`;

DROP TABLE IF EXISTS `GiftCards`;

DROP TABLE IF EXISTS `ComplianceRequests`;

DROP TABLE IF EXISTS `Stores`;

DROP TABLE IF EXISTS `Channels`;

DROP TABLE IF EXISTS `Tasks`;

DROP TABLE IF EXISTS `Projects`;

DROP TABLE IF EXISTS `Notifications`;

DROP TABLE IF EXISTS `Reviews`;

DROP TABLE IF EXISTS `dashboards`;

DROP TABLE IF EXISTS `report_executions`;

DROP TABLE IF EXISTS `reports`;

DROP TABLE IF EXISTS `ContentBlocks`;

DROP TABLE IF EXISTS `Pages`;

DROP TABLE IF EXISTS `business_rules`;

DROP TABLE IF EXISTS `WorkflowTransitions`;

DROP TABLE IF EXISTS `WorkflowStates`;

DROP TABLE IF EXISTS `Workflows`;

DROP TABLE IF EXISTS `Ledgers`;

DROP TABLE IF EXISTS `TaxRates`;

DROP TABLE IF EXISTS `Payouts`;

DROP TABLE IF EXISTS `Invoices`;

DROP TABLE IF EXISTS `Promotions`;

DROP TABLE IF EXISTS `Coupons`;

DROP TABLE IF EXISTS `shipments`;

DROP TABLE IF EXISTS `shippers`;

DROP TABLE IF EXISTS `payments`;

DROP TABLE IF EXISTS `cart_items`;

DROP TABLE IF EXISTS `carts`;

DROP TABLE IF EXISTS `order_items`;

DROP TABLE IF EXISTS `b2b_quotes`;

DROP TABLE IF EXISTS `b2b_accounts`;

DROP TABLE IF EXISTS `orders`;

DROP TABLE IF EXISTS `stock_movements`;

DROP TABLE IF EXISTS `inventory`;

DROP TABLE IF EXISTS `warehouses`;

DROP TABLE IF EXISTS `Tags`;

DROP TABLE IF EXISTS `ProductImages`;

DROP TABLE IF EXISTS `ProductVariants`;

DROP TABLE IF EXISTS `Collections`;

DROP TABLE IF EXISTS `Products`;

DROP TABLE IF EXISTS `Vendors`;

DROP TABLE IF EXISTS `Brands`;

DROP TABLE IF EXISTS `Categories`;

DROP TABLE IF EXISTS `Sessions`;

DROP TABLE IF EXISTS `Addresses`;

DROP TABLE IF EXISTS `Permissions`;

DROP TABLE IF EXISTS `Roles`;

DROP TABLE IF EXISTS `Users`;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Users' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Roles' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Permissions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Addresses' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Sessions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Products' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Categories' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Brands' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Collections' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ProductVariants' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ProductImages' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Tags' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'warehouses' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'inventory' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'stock_movements' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'orders' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'order_items' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'carts' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'cart_items' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'payments' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'shipments' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'shippers' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Coupons' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Promotions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Vendors' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Invoices' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Payouts' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'TaxRates' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Ledgers' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Workflows' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'WorkflowStates' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'WorkflowTransitions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'business_rules' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Pages' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ContentBlocks' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'reports' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'report_executions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'dashboards' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Reviews' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Notifications' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'b2b_accounts' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Projects' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Tasks' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Channels' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'Stores' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ComplianceRequests' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'GiftCards' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'entity_definitions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'entity_fields' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'audit_logs' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'BulkOperations' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'datasets' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'analytics_events' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'b2b_quotes' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'custom_records' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'b2b_contracts' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'price_lists' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'purchase_orders' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'budgets' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'record_versions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'WorkflowRuns' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'WorkflowLogs' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'support_tickets' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ticket_responses' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'kb_articles' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'kb_categories' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'support_macros' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'sla_rules' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'UserRoles' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'RolePermissions' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ProductCollections' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'ProductTags' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='tailored_bridge_store_db' AND REFERENCED_TABLE_NAME IS NOT NULL;

DROP TABLE IF EXISTS `Users`;

DROP TABLE IF EXISTS `Roles`;

DROP TABLE IF EXISTS `Permissions`;

DROP TABLE IF EXISTS `Addresses`;

DROP TABLE IF EXISTS `Sessions`;

DROP TABLE IF EXISTS `Products`;

DROP TABLE IF EXISTS `Categories`;

DROP TABLE IF EXISTS `Brands`;

DROP TABLE IF EXISTS `Collections`;

DROP TABLE IF EXISTS `ProductVariants`;

DROP TABLE IF EXISTS `ProductImages`;

DROP TABLE IF EXISTS `Tags`;

DROP TABLE IF EXISTS `warehouses`;

DROP TABLE IF EXISTS `inventory`;

DROP TABLE IF EXISTS `stock_movements`;

DROP TABLE IF EXISTS `orders`;

DROP TABLE IF EXISTS `order_items`;

DROP TABLE IF EXISTS `carts`;

DROP TABLE IF EXISTS `cart_items`;

DROP TABLE IF EXISTS `payments`;

DROP TABLE IF EXISTS `shipments`;

DROP TABLE IF EXISTS `shippers`;

DROP TABLE IF EXISTS `Coupons`;

DROP TABLE IF EXISTS `Promotions`;

DROP TABLE IF EXISTS `Vendors`;

DROP TABLE IF EXISTS `Invoices`;

DROP TABLE IF EXISTS `Payouts`;

DROP TABLE IF EXISTS `TaxRates`;

DROP TABLE IF EXISTS `Ledgers`;

DROP TABLE IF EXISTS `Workflows`;

DROP TABLE IF EXISTS `WorkflowStates`;

DROP TABLE IF EXISTS `WorkflowTransitions`;

DROP TABLE IF EXISTS `business_rules`;

DROP TABLE IF EXISTS `Pages`;

DROP TABLE IF EXISTS `ContentBlocks`;

DROP TABLE IF EXISTS `reports`;

DROP TABLE IF EXISTS `report_executions`;

DROP TABLE IF EXISTS `dashboards`;

DROP TABLE IF EXISTS `Reviews`;

DROP TABLE IF EXISTS `Notifications`;

DROP TABLE IF EXISTS `b2b_accounts`;

DROP TABLE IF EXISTS `Projects`;

DROP TABLE IF EXISTS `Tasks`;

DROP TABLE IF EXISTS `Channels`;

DROP TABLE IF EXISTS `Stores`;

DROP TABLE IF EXISTS `ComplianceRequests`;

DROP TABLE IF EXISTS `GiftCards`;

DROP TABLE IF EXISTS `entity_definitions`;

DROP TABLE IF EXISTS `entity_fields`;

DROP TABLE IF EXISTS `audit_logs`;

DROP TABLE IF EXISTS `BulkOperations`;

DROP TABLE IF EXISTS `datasets`;

DROP TABLE IF EXISTS `analytics_events`;

DROP TABLE IF EXISTS `b2b_quotes`;

DROP TABLE IF EXISTS `custom_records`;

DROP TABLE IF EXISTS `b2b_contracts`;

DROP TABLE IF EXISTS `price_lists`;

DROP TABLE IF EXISTS `purchase_orders`;

DROP TABLE IF EXISTS `budgets`;

DROP TABLE IF EXISTS `record_versions`;

DROP TABLE IF EXISTS `WorkflowRuns`;

DROP TABLE IF EXISTS `WorkflowLogs`;

DROP TABLE IF EXISTS `support_tickets`;

DROP TABLE IF EXISTS `ticket_responses`;

DROP TABLE IF EXISTS `kb_articles`;

DROP TABLE IF EXISTS `kb_categories`;

DROP TABLE IF EXISTS `support_macros`;

DROP TABLE IF EXISTS `sla_rules`;

DROP TABLE IF EXISTS `UserRoles`;

DROP TABLE IF EXISTS `RolePermissions`;

DROP TABLE IF EXISTS `ProductCollections`;

DROP TABLE IF EXISTS `ProductTags`;

DROP TABLE IF EXISTS `Users`;

CREATE TABLE IF NOT EXISTS `Users` (`id` CHAR(36) BINARY , `email` VARCHAR(255) NOT NULL UNIQUE, `passwordHash` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255), `lastName` VARCHAR(255), `role` VARCHAR(255) DEFAULT 'customer', `isActive` TINYINT(1) DEFAULT true, `isVerified` TINYINT(1) DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Users`;

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE IF NOT EXISTS `Roles` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Roles`;

DROP TABLE IF EXISTS `Permissions`;

CREATE TABLE IF NOT EXISTS `Permissions` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Format: resource:action e.g. users:create', `description` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Permissions`;

DROP TABLE IF EXISTS `Addresses`;

CREATE TABLE IF NOT EXISTS `Addresses` (`id` CHAR(36) BINARY , `userId` CHAR(36) BINARY NOT NULL, `type` ENUM('shipping', 'billing') DEFAULT 'shipping', `firstName` VARCHAR(255), `lastName` VARCHAR(255), `street` VARCHAR(255), `city` VARCHAR(255), `state` VARCHAR(255), `postalCode` VARCHAR(255), `country` VARCHAR(255), `phone` VARCHAR(255), `isDefault` TINYINT(1) DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Addresses`;

DROP TABLE IF EXISTS `Sessions`;

CREATE TABLE IF NOT EXISTS `Sessions` (`id` CHAR(36) BINARY , `token` TEXT NOT NULL, `device` VARCHAR(255), `ipAddress` VARCHAR(255), `userAgent` VARCHAR(255), `userId` CHAR(36) BINARY, `expiresAt` DATETIME, `isValid` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Sessions`;

DROP TABLE IF EXISTS `Categories`;

CREATE TABLE IF NOT EXISTS `Categories` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `parentId` CHAR(36) BINARY, `image` VARCHAR(255), `isActive` TINYINT(1) DEFAULT true, `sortOrder` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`parentId`) REFERENCES `Categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Categories`;

DROP TABLE IF EXISTS `Brands`;

CREATE TABLE IF NOT EXISTS `Brands` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `logo` VARCHAR(255), `website` VARCHAR(255), `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Brands`;

DROP TABLE IF EXISTS `Vendors`;

CREATE TABLE IF NOT EXISTS `Vendors` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL UNIQUE, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `logo` VARCHAR(255), `banner` VARCHAR(255), `commissionRate` FLOAT DEFAULT 10, `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED') DEFAULT 'PENDING', `verificationStatus` ENUM('UNVERIFIED', 'VERIFIED') DEFAULT 'UNVERIFIED', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Vendors`;

DROP TABLE IF EXISTS `Products`;

CREATE TABLE IF NOT EXISTS `Products` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `shortDescription` VARCHAR(500), `price` DECIMAL(10,2) NOT NULL, `compareAtPrice` DECIMAL(10,2), `cost` DECIMAL(10,2), `sku` VARCHAR(255) UNIQUE, `barcode` VARCHAR(255), `quantity` INTEGER DEFAULT 0, `categoryId` CHAR(36) BINARY, `brandId` CHAR(36) BINARY, `vendorId` CHAR(36) BINARY, `status` ENUM('draft', 'active', 'archived') DEFAULT 'draft', `images` JSON, `tags` JSON, `weight` DECIMAL(10,2), `weightUnit` ENUM('kg', 'g', 'lb', 'oz') DEFAULT 'kg', `isFeatured` TINYINT(1) DEFAULT false, `isVisible` TINYINT(1) DEFAULT true, `seoTitle` VARCHAR(255), `seoDescription` TEXT, `seoKeywords` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`brandId`) REFERENCES `Brands` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`vendorId`) REFERENCES `Vendors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Products`;

DROP TABLE IF EXISTS `Collections`;

CREATE TABLE IF NOT EXISTS `Collections` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `image` VARCHAR(255), `isActive` TINYINT(1) DEFAULT true, `startDate` DATETIME, `endDate` DATETIME, `userId` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Collections`;

DROP TABLE IF EXISTS `ProductVariants`;

CREATE TABLE IF NOT EXISTS `ProductVariants` (`id` CHAR(36) BINARY , `productId` CHAR(36) BINARY NOT NULL, `name` VARCHAR(255) NOT NULL, `sku` VARCHAR(255) UNIQUE, `barcode` VARCHAR(255), `price` DECIMAL(10,2), `compareAtPrice` DECIMAL(10,2), `cost` DECIMAL(10,2), `quantity` INTEGER DEFAULT 0, `weight` DECIMAL(10,2), `weightUnit` VARCHAR(255), `dimensions` JSON, `options` JSON, `image` VARCHAR(255), `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ProductVariants`;

DROP TABLE IF EXISTS `ProductImages`;

CREATE TABLE IF NOT EXISTS `ProductImages` (`id` CHAR(36) BINARY , `url` VARCHAR(255) NOT NULL, `altText` VARCHAR(255), `isPrimary` TINYINT(1) DEFAULT false, `sortOrder` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `productId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ProductImages`;

DROP TABLE IF EXISTS `Tags`;

CREATE TABLE IF NOT EXISTS `Tags` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL UNIQUE, `slug` VARCHAR(255) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Tags`;

DROP TABLE IF EXISTS `warehouses`;

CREATE TABLE IF NOT EXISTS `warehouses` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `code` VARCHAR(255) UNIQUE, `address` VARCHAR(255), `city` VARCHAR(255), `country` VARCHAR(255), `contactPerson` VARCHAR(255), `contactEmail` VARCHAR(255), `capacity` INTEGER DEFAULT 0, `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `warehouses`;

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE IF NOT EXISTS `inventory` (`id` CHAR(36) BINARY , `productId` CHAR(36) BINARY, `variantId` CHAR(36) BINARY, `warehouseId` CHAR(36) BINARY, `quantity` INTEGER DEFAULT 0, `reserved` INTEGER DEFAULT 0, `sku` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`variantId`) REFERENCES `ProductVariants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`warehouseId`) REFERENCES `Warehouses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `inventory`;

DROP TABLE IF EXISTS `stock_movements`;

CREATE TABLE IF NOT EXISTS `stock_movements` (`id` INTEGER auto_increment , `productId` CHAR(36) BINARY NOT NULL, `variantId` CHAR(36) BINARY, `warehouseId` CHAR(36) BINARY, `type` ENUM('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'TRANSFER_IN', 'TRANSFER_OUT', 'RESERVED', 'RELEASED', 'DAMAGED', 'LOST') NOT NULL, `quantity` INTEGER NOT NULL, `previousQuantity` INTEGER, `newQuantity` INTEGER, `orderId` CHAR(36) BINARY, `reason` TEXT, `userId` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`variantId`) REFERENCES `ProductVariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`warehouseId`) REFERENCES `Warehouses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `stock_movements`;

DROP TABLE IF EXISTS `orders`;

CREATE TABLE IF NOT EXISTS `orders` (`id` CHAR(36) BINARY , `orderNumber` VARCHAR(255) UNIQUE, `userId` CHAR(36) BINARY, `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending', `subtotal` DECIMAL(10,2), `tax` DECIMAL(10,2), `shipping` DECIMAL(10,2), `discount` DECIMAL(10,2), `total` DECIMAL(10,2), `shippingAddress` JSON, `billingAddress` JSON, `paymentMethod` VARCHAR(255), `paymentStatus` ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending', `trackingNumber` VARCHAR(255), `notes` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `orders`;

DROP TABLE IF EXISTS `b2b_accounts`;

CREATE TABLE IF NOT EXISTS `b2b_accounts` (`id` CHAR(36) BINARY , `companyName` VARCHAR(255) NOT NULL, `taxId` VARCHAR(255), `contactEmail` VARCHAR(255), `contactPhone` VARCHAR(255), `website` VARCHAR(255), `status` ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED') DEFAULT 'PENDING', `creditLimit` DECIMAL(10,2) DEFAULT 0, `balance` DECIMAL(10,2) DEFAULT 0, `paymentTerms` VARCHAR(255) DEFAULT 'NET30', `userId` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `b2b_accounts`;

DROP TABLE IF EXISTS `b2b_quotes`;

CREATE TABLE IF NOT EXISTS `b2b_quotes` (`id` CHAR(36) BINARY , `status` VARCHAR(255) DEFAULT 'draft', `totalAmount` DECIMAL(10,2), `validUntil` DATETIME, `notes` TEXT, `adminNotes` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, `accountId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`accountId`) REFERENCES `b2b_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `b2b_quotes`;

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE IF NOT EXISTS `order_items` (`id` CHAR(36) BINARY , `orderId` CHAR(36) BINARY NOT NULL, `quoteId` CHAR(36) BINARY, `productId` CHAR(36) BINARY NOT NULL, `variantId` CHAR(36) BINARY, `productName` VARCHAR(255) NOT NULL, `sku` VARCHAR(255), `price` DECIMAL(10,2) NOT NULL, `quantity` INTEGER NOT NULL DEFAULT 1, `total` DECIMAL(10,2) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`quoteId`) REFERENCES `b2b_quotes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`variantId`) REFERENCES `ProductVariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `order_items`;

DROP TABLE IF EXISTS `carts`;

CREATE TABLE IF NOT EXISTS `carts` (`id` CHAR(36) BINARY , `userId` CHAR(36) BINARY, `sessionId` VARCHAR(255), `subtotal` DECIMAL(10,2) DEFAULT 0, `tax` DECIMAL(10,2) DEFAULT 0, `total` DECIMAL(10,2) DEFAULT 0, `couponCode` VARCHAR(255), `discount` DECIMAL(10,2) DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `carts`;

DROP TABLE IF EXISTS `cart_items`;

CREATE TABLE IF NOT EXISTS `cart_items` (`id` CHAR(36) BINARY , `cartId` CHAR(36) BINARY NOT NULL, `productId` CHAR(36) BINARY NOT NULL, `variantId` CHAR(36) BINARY, `quantity` INTEGER DEFAULT 1, `price` DECIMAL(10,2) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`cartId`) REFERENCES `Carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`variantId`) REFERENCES `ProductVariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `cart_items`;

DROP TABLE IF EXISTS `payments`;

CREATE TABLE IF NOT EXISTS `payments` (`id` INTEGER auto_increment , `orderId` CHAR(36) BINARY NOT NULL, `amount` DECIMAL(10,2) NOT NULL, `currency` VARCHAR(3) DEFAULT 'USD', `method` ENUM('credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer') NOT NULL, `status` ENUM('PENDING', 'AUTHORIZED', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'VOIDED') DEFAULT 'PENDING', `transactionId` VARCHAR(255) UNIQUE, `parentPaymentId` INTEGER, `refundedAmount` DECIMAL(10,2) DEFAULT 0, `refundReason` TEXT, `metadata` JSON, `processedAt` DATETIME, `capturedAt` DATETIME, `voidedAt` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`parentPaymentId`) REFERENCES `payments` (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `payments`;

DROP TABLE IF EXISTS `shippers`;

CREATE TABLE IF NOT EXISTS `shippers` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `code` VARCHAR(255) NOT NULL UNIQUE, `apiKey` VARCHAR(255), `apiSecret` VARCHAR(255), `trackingUrl` VARCHAR(500), `isActive` TINYINT(1) DEFAULT true, `services` JSON, `config` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `shippers`;

DROP TABLE IF EXISTS `shipments`;

CREATE TABLE IF NOT EXISTS `shipments` (`id` INTEGER auto_increment , `orderId` CHAR(36) BINARY NOT NULL, `carrier` VARCHAR(255) NOT NULL, `service` VARCHAR(255), `trackingNumber` VARCHAR(255) UNIQUE, `labelUrl` VARCHAR(255), `cost` DECIMAL(10,2), `weight` DECIMAL(10,2), `status` ENUM('CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'CANCELLED') DEFAULT 'CREATED', `shippingAddress` JSON, `pickupScheduledAt` DATETIME, `shippedAt` DATETIME, `deliveredAt` DATETIME, `cancelledAt` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `shipperId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`shipperId`) REFERENCES `shippers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `shipments`;

DROP TABLE IF EXISTS `Coupons`;

CREATE TABLE IF NOT EXISTS `Coupons` (`id` CHAR(36) BINARY , `code` VARCHAR(255) NOT NULL UNIQUE, `type` ENUM('percentage', 'fixed') DEFAULT 'percentage', `value` DECIMAL(10,2) NOT NULL, `minPurchase` DECIMAL(10,2), `maxDiscount` DECIMAL(10,2), `usageLimit` INTEGER, `usageCount` INTEGER DEFAULT 0, `startsAt` DATETIME, `expiresAt` DATETIME, `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Coupons`;

DROP TABLE IF EXISTS `Promotions`;

CREATE TABLE IF NOT EXISTS `Promotions` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `startDate` DATETIME, `endDate` DATETIME, `isActive` TINYINT(1) DEFAULT true, `rules` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Promotions`;

DROP TABLE IF EXISTS `Invoices`;

CREATE TABLE IF NOT EXISTS `Invoices` (`id` CHAR(36) BINARY , `orderId` CHAR(36) BINARY NOT NULL, `invoiceNumber` VARCHAR(255) NOT NULL UNIQUE, `issueDate` DATETIME, `dueDate` DATETIME, `totalAmount` DECIMAL(10,2), `status` ENUM('DRAFT', 'ISSUED', 'PAID', 'VOID', 'OVERDUE') DEFAULT 'DRAFT', `itemsSnapshot` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `billToId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`billToId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Invoices`;

DROP TABLE IF EXISTS `Payouts`;

CREATE TABLE IF NOT EXISTS `Payouts` (`id` CHAR(36) BINARY , `amount` DECIMAL(10,2), `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING', `transactionId` VARCHAR(255), `payoutDate` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `vendorId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`vendorId`) REFERENCES `Vendors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Payouts`;

DROP TABLE IF EXISTS `TaxRates`;

CREATE TABLE IF NOT EXISTS `TaxRates` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `rate` FLOAT NOT NULL, `country` VARCHAR(255), `state` VARCHAR(255), `type` ENUM('VAT', 'SALES_TAX') DEFAULT 'VAT', `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `TaxRates`;

DROP TABLE IF EXISTS `Ledgers`;

CREATE TABLE IF NOT EXISTS `Ledgers` (`id` CHAR(36) BINARY , `account` VARCHAR(255) NOT NULL, `type` ENUM('DEBIT', 'CREDIT') NOT NULL, `amount` DECIMAL(10,2) NOT NULL, `description` VARCHAR(255), `referenceId` VARCHAR(255), `referenceType` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Ledgers`;

DROP TABLE IF EXISTS `Workflows`;

CREATE TABLE IF NOT EXISTS `Workflows` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `trigger` VARCHAR(100), `config` JSON, `isActive` TINYINT(1) DEFAULT true, `isPublished` TINYINT(1) DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Workflows`;

DROP TABLE IF EXISTS `WorkflowStates`;

CREATE TABLE IF NOT EXISTS `WorkflowStates` (`id` CHAR(36) BINARY , `workflowId` CHAR(36) BINARY NOT NULL, `name` VARCHAR(255) NOT NULL, `type` VARCHAR(50), `config` JSON, `sortOrder` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`workflowId`) REFERENCES `Workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `WorkflowStates`;

DROP TABLE IF EXISTS `WorkflowTransitions`;

CREATE TABLE IF NOT EXISTS `WorkflowTransitions` (`id` CHAR(36) BINARY , `workflowId` CHAR(36) BINARY NOT NULL, `fromStateId` CHAR(36) BINARY, `toStateId` CHAR(36) BINARY, `condition` JSON, `action` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`workflowId`) REFERENCES `Workflows` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`fromStateId`) REFERENCES `WorkflowStates` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`toStateId`) REFERENCES `WorkflowStates` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `WorkflowTransitions`;

DROP TABLE IF EXISTS `business_rules`;

CREATE TABLE IF NOT EXISTS `business_rules` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `entityType` VARCHAR(255) NOT NULL, `triggerEvent` VARCHAR(255) NOT NULL, `conditions` JSON, `actions` JSON, `priority` INTEGER DEFAULT 0, `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `business_rules`;

DROP TABLE IF EXISTS `Pages`;

CREATE TABLE IF NOT EXISTS `Pages` (`id` CHAR(36) BINARY , `title` VARCHAR(255) NOT NULL, `slug` VARCHAR(255) NOT NULL UNIQUE, `content` LONGTEXT, `metaTitle` VARCHAR(255), `metaDescription` TEXT, `isPublished` TINYINT(1) DEFAULT false, `publishedAt` DATETIME, `template` VARCHAR(255) DEFAULT 'default', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Pages`;

DROP TABLE IF EXISTS `ContentBlocks`;

CREATE TABLE IF NOT EXISTS `ContentBlocks` (`id` CHAR(36) BINARY , `identifier` VARCHAR(255) NOT NULL UNIQUE, `title` VARCHAR(255), `content` JSON, `type` VARCHAR(255) DEFAULT 'html', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `ContentBlocks`;

DROP TABLE IF EXISTS `reports`;

CREATE TABLE IF NOT EXISTS `reports` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `query` TEXT, `parameters` JSON, `type` ENUM('TABLE', 'CHART', 'PIVOT') DEFAULT 'TABLE', `createdBy` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `reports`;

DROP TABLE IF EXISTS `report_executions`;

CREATE TABLE IF NOT EXISTS `report_executions` (`id` CHAR(36) BINARY , `status` ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING', `resultUrl` VARCHAR(255), `executionTimeMs` INTEGER, `executedBy` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `reportId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `report_executions`;

DROP TABLE IF EXISTS `dashboards`;

CREATE TABLE IF NOT EXISTS `dashboards` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `layout` JSON, `isPublic` TINYINT(1) DEFAULT false, `createdBy` CHAR(36) BINARY, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `dashboards`;

DROP TABLE IF EXISTS `Reviews`;

CREATE TABLE IF NOT EXISTS `Reviews` (`id` CHAR(36) BINARY , `productId` CHAR(36) BINARY NOT NULL, `userId` CHAR(36) BINARY NOT NULL, `rating` INTEGER NOT NULL, `title` VARCHAR(255), `comment` TEXT, `isVerifiedPurchase` TINYINT(1) DEFAULT false, `isApproved` TINYINT(1) DEFAULT false, `helpfulCount` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Reviews`;

DROP TABLE IF EXISTS `Notifications`;

CREATE TABLE IF NOT EXISTS `Notifications` (`id` CHAR(36) BINARY , `userId` CHAR(36) BINARY NOT NULL, `type` ENUM('order', 'promotion', 'system', 'product') NOT NULL, `title` VARCHAR(255) NOT NULL, `message` TEXT, `data` JSON, `isRead` TINYINT(1) DEFAULT false, `readAt` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Notifications`;

DROP TABLE IF EXISTS `Projects`;

CREATE TABLE IF NOT EXISTS `Projects` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `status` VARCHAR(255) DEFAULT 'planning', `startDate` DATETIME, `endDate` DATETIME, `budget` DECIMAL(10,2), `milestones` JSON, `risks` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `managerId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`managerId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Projects`;

DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE IF NOT EXISTS `Tasks` (`id` CHAR(36) BINARY , `title` VARCHAR(255) NOT NULL, `description` TEXT, `status` VARCHAR(255) DEFAULT 'todo', `priority` VARCHAR(255) DEFAULT 'medium', `dueDate` DATETIME, `comments` JSON, `dependencies` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `projectId` CHAR(36) BINARY, `assigneeId` CHAR(36) BINARY, `reporterId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`assigneeId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`reporterId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Tasks`;

DROP TABLE IF EXISTS `Channels`;

CREATE TABLE IF NOT EXISTS `Channels` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `type` VARCHAR(255) NOT NULL, `config` JSON, `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `Channels`;

DROP TABLE IF EXISTS `Stores`;

CREATE TABLE IF NOT EXISTS `Stores` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `code` VARCHAR(255) UNIQUE, `type` VARCHAR(255) DEFAULT 'retail', `isActive` TINYINT(1) DEFAULT true, `openingHours` JSON, `contactPhone` VARCHAR(255), `managerName` VARCHAR(255), `geoLat` FLOAT, `geoLng` FLOAT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `channelId` CHAR(36) BINARY, `addressId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`channelId`) REFERENCES `Channels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`addressId`) REFERENCES `Addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `Stores`;

DROP TABLE IF EXISTS `ComplianceRequests`;

CREATE TABLE IF NOT EXISTS `ComplianceRequests` (`id` CHAR(36) BINARY , `type` VARCHAR(255) NOT NULL, `status` VARCHAR(255) DEFAULT 'pending', `details` TEXT, `requestDate` DATETIME, `completionDate` DATETIME, `adminNotes` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ComplianceRequests`;

DROP TABLE IF EXISTS `GiftCards`;

CREATE TABLE IF NOT EXISTS `GiftCards` (`id` CHAR(36) BINARY , `code` VARCHAR(255) NOT NULL UNIQUE, `initialBalance` DECIMAL(10,2) NOT NULL, `currentBalance` DECIMAL(10,2) NOT NULL, `currency` VARCHAR(255) DEFAULT 'USD', `isActive` TINYINT(1) DEFAULT true, `expiryDate` DATETIME, `isDigital` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `GiftCards`;

DROP TABLE IF EXISTS `entity_definitions`;

CREATE TABLE IF NOT EXISTS `entity_definitions` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL UNIQUE, `slug` VARCHAR(255) NOT NULL UNIQUE, `description` TEXT, `isSystem` TINYINT(1) DEFAULT false, `isPublished` TINYINT(1) DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `entity_definitions`;

DROP TABLE IF EXISTS `entity_fields`;

CREATE TABLE IF NOT EXISTS `entity_fields` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `key` VARCHAR(255) NOT NULL, `type` VARCHAR(255) NOT NULL, `isRequired` TINYINT(1) DEFAULT false, `defaultValue` VARCHAR(255), `options` JSON, `order` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `entityId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`entityId`) REFERENCES `entity_definitions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `entity_fields`;

DROP TABLE IF EXISTS `audit_logs`;

CREATE TABLE IF NOT EXISTS `audit_logs` (`id` CHAR(36) BINARY , `action` VARCHAR(255) NOT NULL, `entityType` VARCHAR(255), `entityId` VARCHAR(255), `changes` JSON, `ipAddress` VARCHAR(255), `userAgent` VARCHAR(255), `status` VARCHAR(255) DEFAULT 'success', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `audit_logs`;

DROP TABLE IF EXISTS `BulkOperations`;

CREATE TABLE IF NOT EXISTS `BulkOperations` (`id` CHAR(36) BINARY , `type` VARCHAR(255) NOT NULL, `status` VARCHAR(255) DEFAULT 'pending', `totalItems` INTEGER DEFAULT 0, `processedItems` INTEGER DEFAULT 0, `failedItems` INTEGER DEFAULT 0, `fileUrl` VARCHAR(255), `resultUrl` VARCHAR(255), `config` JSON, `startedAt` DATETIME, `completedAt` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `BulkOperations`;

DROP TABLE IF EXISTS `datasets`;

CREATE TABLE IF NOT EXISTS `datasets` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `sourceType` VARCHAR(255) NOT NULL, `config` JSON, `schema` JSON, `refreshRate` VARCHAR(255), `lastRefreshedAt` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `datasets`;

DROP TABLE IF EXISTS `analytics_events`;

CREATE TABLE IF NOT EXISTS `analytics_events` (`id` CHAR(36) BINARY , `eventName` VARCHAR(255) NOT NULL, `category` VARCHAR(255), `properties` JSON, `sessionId` VARCHAR(255), `deviceInfo` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `analytics_events`;

DROP TABLE IF EXISTS `custom_records`;

CREATE TABLE IF NOT EXISTS `custom_records` (`id` CHAR(36) BINARY , `entityType` VARCHAR(255) NOT NULL, `data` JSON, `createdBy` VARCHAR(255), `updatedBy` VARCHAR(255), `version` INTEGER DEFAULT 1, `isLocked` TINYINT(1) DEFAULT false, `lockedBy` VARCHAR(255), `isDeleted` TINYINT(1) DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `custom_records`;

DROP TABLE IF EXISTS `b2b_contracts`;

CREATE TABLE IF NOT EXISTS `b2b_contracts` (`id` CHAR(36) BINARY , `contractNumber` VARCHAR(255) UNIQUE, `title` VARCHAR(255), `status` VARCHAR(255) DEFAULT 'active', `startDate` DATETIME, `endDate` DATETIME, `terms` TEXT, `fileUrl` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`accountId`) REFERENCES `b2b_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `b2b_contracts`;

DROP TABLE IF EXISTS `price_lists`;

CREATE TABLE IF NOT EXISTS `price_lists` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `currency` VARCHAR(255) DEFAULT 'USD', `isActive` TINYINT(1) DEFAULT true, `rules` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`accountId`) REFERENCES `b2b_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `price_lists`;

DROP TABLE IF EXISTS `purchase_orders`;

CREATE TABLE IF NOT EXISTS `purchase_orders` (`id` CHAR(36) BINARY , `poNumber` VARCHAR(255) NOT NULL, `status` VARCHAR(255) DEFAULT 'pending', `amount` DECIMAL(10,2), `fileUrl` VARCHAR(255), `notes` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` CHAR(36) BINARY, `associatedOrderId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`accountId`) REFERENCES `b2b_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`associatedOrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `purchase_orders`;

DROP TABLE IF EXISTS `budgets`;

CREATE TABLE IF NOT EXISTS `budgets` (`id` CHAR(36) BINARY , `name` VARCHAR(255), `totalAmount` DECIMAL(10,2), `spentAmount` DECIMAL(10,2) DEFAULT 0, `period` VARCHAR(255) DEFAULT 'monthly', `startDate` DATETIME, `endDate` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`accountId`) REFERENCES `b2b_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `budgets`;

DROP TABLE IF EXISTS `record_versions`;

CREATE TABLE IF NOT EXISTS `record_versions` (`id` CHAR(36) BINARY , `recordId` CHAR(36) BINARY NOT NULL, `versionNumber` INTEGER NOT NULL, `data` JSON, `changedBy` VARCHAR(255), `changeReason` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`recordId`) REFERENCES `custom_records` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `record_versions`;

DROP TABLE IF EXISTS `WorkflowRuns`;

CREATE TABLE IF NOT EXISTS `WorkflowRuns` (`id` CHAR(36) BINARY , `workflowId` CHAR(36) BINARY NOT NULL, `triggeredBy` VARCHAR(255) DEFAULT 'MANUAL', `userId` CHAR(36) BINARY, `status` VARCHAR(255) DEFAULT 'PENDING', `inputData` JSON, `outputData` JSON, `startedAt` DATETIME, `completedAt` DATETIME, `duration` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`workflowId`) REFERENCES `Workflows` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `WorkflowRuns`;

DROP TABLE IF EXISTS `WorkflowLogs`;

CREATE TABLE IF NOT EXISTS `WorkflowLogs` (`id` CHAR(36) BINARY , `runId` CHAR(36) BINARY NOT NULL, `level` VARCHAR(255) DEFAULT 'INFO', `message` TEXT NOT NULL, `details` JSON, `stepName` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`runId`) REFERENCES `WorkflowRuns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `WorkflowLogs`;

DROP TABLE IF EXISTS `support_tickets`;

CREATE TABLE IF NOT EXISTS `support_tickets` (`id` CHAR(36) BINARY , `subject` VARCHAR(255) NOT NULL, `description` TEXT NOT NULL, `status` ENUM('OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN', `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM', `category` VARCHAR(255), `userId` CHAR(36) BINARY NOT NULL, `assignedTo` CHAR(36) BINARY, `closedAt` DATETIME, `metadata` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`assignedTo`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `support_tickets`;

DROP TABLE IF EXISTS `ticket_responses`;

CREATE TABLE IF NOT EXISTS `ticket_responses` (`id` CHAR(36) BINARY , `ticketId` CHAR(36) BINARY NOT NULL, `userId` CHAR(36) BINARY NOT NULL, `message` TEXT NOT NULL, `isInternal` TINYINT(1) DEFAULT false, `attachments` JSON, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`ticketId`) REFERENCES `support_tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ticket_responses`;

DROP TABLE IF EXISTS `kb_categories`;

CREATE TABLE IF NOT EXISTS `kb_categories` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `description` TEXT, `icon` VARCHAR(255), `slug` VARCHAR(255) UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `kb_categories`;

DROP TABLE IF EXISTS `kb_articles`;

CREATE TABLE IF NOT EXISTS `kb_articles` (`id` CHAR(36) BINARY , `title` VARCHAR(255) NOT NULL, `content` TEXT NOT NULL, `slug` VARCHAR(255) UNIQUE, `categoryId` CHAR(36) BINARY, `isPublished` TINYINT(1) DEFAULT false, `viewCount` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`categoryId`) REFERENCES `kb_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `kb_articles`;

DROP TABLE IF EXISTS `support_macros`;

CREATE TABLE IF NOT EXISTS `support_macros` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL, `text` TEXT NOT NULL, `category` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `support_macros`;

DROP TABLE IF EXISTS `sla_rules`;

CREATE TABLE IF NOT EXISTS `sla_rules` (`id` CHAR(36) BINARY , `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL, `responseTimeHours` INTEGER, `resolutionTimeHours` INTEGER, `isActive` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW INDEX FROM `sla_rules`;

DROP TABLE IF EXISTS `UserRoles`;

CREATE TABLE IF NOT EXISTS `UserRoles` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `roleId` CHAR(36) BINARY , `UserId` CHAR(36) BINARY , PRIMARY KEY (`roleId`, `UserId`), FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `UserRoles`;

DROP TABLE IF EXISTS `RolePermissions`;

CREATE TABLE IF NOT EXISTS `RolePermissions` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `roleId` CHAR(36) BINARY , `permissionId` CHAR(36) BINARY , PRIMARY KEY (`roleId`, `permissionId`), FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `RolePermissions`;

DROP TABLE IF EXISTS `ProductCollections`;

CREATE TABLE IF NOT EXISTS `ProductCollections` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `productId` CHAR(36) BINARY , `collectionId` CHAR(36) BINARY , PRIMARY KEY (`productId`, `collectionId`), FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`collectionId`) REFERENCES `Collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ProductCollections`;

DROP TABLE IF EXISTS `ProductTags`;

CREATE TABLE IF NOT EXISTS `ProductTags` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `tagId` CHAR(36) BINARY , `ProductId` CHAR(36) BINARY , PRIMARY KEY (`tagId`, `ProductId`), FOREIGN KEY (`tagId`) REFERENCES `Tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`ProductId`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

SHOW INDEX FROM `ProductTags`;

SET FOREIGN_KEY_CHECKS = 1;
