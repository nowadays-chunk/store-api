# Database Setup Guide

## Prerequisites
- MySQL 8.0 or higher installed
- MySQL client or MySQL Workbench

## Quick Setup

### 1. Create Database and Schema
```bash
mysql -u root -p < database/schema.sql
```

### 2. Load Seed Data (Optional)
```bash
mysql -u root -p moroccan_store_db < database/seed.sql
```

### 3. Update Environment Variables
Make sure your `.env` file has the correct database credentials:
```env
DB_NAME=moroccan_store_db
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=3306
```

## Database Schema Overview

### Core Tables (41 total)

#### User & Authentication
- `Users` - User accounts
- `Roles` - User roles
- `Permissions` - Access permissions
- `Sessions` - Active sessions
- `Addresses` - User addresses

#### Product Catalog
- `Products` - Main product table
- `ProductVariants` - Product variations
- `ProductImages` - Product images
- `Categories` - Product categories
- `Brands` - Product brands
- `Collections` - Product collections
- `Tags` - Product tags
- `Reviews` - Product reviews

#### Shopping
- `Carts` - Shopping carts
- `CartItems` - Cart items
- `Wishlists` - User wishlists

#### Orders
- `Orders` - Customer orders
- `OrderItems` - Order line items
- `Payments` - Payment transactions
- `Shipments` - Shipping information
- `Shippers` - Shipping carriers

#### Inventory
- `Warehouses` - Warehouse locations
- `Inventories` - Stock levels
- `StockMovements` - Inventory transactions

#### Marketing
- `Coupons` - Discount coupons
- `Promotions` - Promotional campaigns
- `Notifications` - User notifications

#### Vendors
- `Vendors` - Marketplace vendors
- `Payouts` - Vendor payouts
- `Invoices` - Vendor invoices

#### CMS
- `Pages` - CMS pages
- `ContentBlocks` - Page content blocks

#### Workflow
- `Workflows` - Automation workflows
- `WorkflowStates` - Workflow states
- `WorkflowTransitions` - State transitions
- `BusinessRules` - Business rules engine

#### Analytics
- `Reports` - Report definitions
- `ReportExecutions` - Report runs
- `Dashboards` - User dashboards

#### Financial
- `TaxRates` - Tax configurations
- `Ledgers` - Financial ledger

## Key Features

### Indexes
All tables include optimized indexes for:
- Primary keys (UUID)
- Foreign keys
- Frequently queried columns
- Full-text search on products

### Constraints
- Foreign key constraints with appropriate CASCADE/RESTRICT rules
- Unique constraints on slugs, emails, SKUs
- Check constraints on ratings
- Generated columns for calculated fields

### Data Types
- UUID (CHAR(36)) for primary keys
- DECIMAL(10,2) for monetary values
- JSON for flexible data storage
- ENUM for status fields
- TEXT for long content
- DATETIME with automatic timestamps

## Maintenance

### Backup Database
```bash
mysqldump -u root -p moroccan_store_db > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u root -p moroccan_store_db < backup_20240204.sql
```

### Check Table Status
```sql
SHOW TABLE STATUS FROM moroccan_store_db;
```

### Optimize Tables
```sql
OPTIMIZE TABLE Products, Orders, OrderItems;
```

## Performance Tips

1. **Indexes are already optimized** for common queries
2. **Use EXPLAIN** to analyze slow queries
3. **Monitor slow query log** in production
4. **Consider partitioning** large tables (Orders, Ledgers) by date
5. **Regular ANALYZE TABLE** to update statistics

## Security

1. **Never use root** in production - create dedicated user:
```sql
CREATE USER 'store_api'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON moroccan_store_db.* TO 'store_api'@'localhost';
FLUSH PRIVILEGES;
```

2. **Enable SSL** for database connections
3. **Regular backups** with encryption
4. **Audit logging** for sensitive operations
