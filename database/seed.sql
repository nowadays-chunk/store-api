-- ============================================
-- MySQL 8 Seed Data for Tailored Bridge Store
-- Initial data for testing and development
-- ============================================

USE moroccan_store_db;

-- ============================================
-- SEED ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed with bcrypt)
INSERT INTO Users (id, email, passwordHash, firstName, lastName, role, isActive, isVerified, createdAt, updatedAt) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@tailoredbridge.com', '$2a$10$rZ5YvZ5YvZ5YvZ5YvZ5YvuZ5YvZ5YvZ5YvZ5YvZ5YvZ5YvZ5Yv', 'Admin', 'User', 'admin', TRUE, TRUE, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'customer@example.com', '$2a$10$rZ5YvZ5YvZ5YvZ5YvZ5YvuZ5YvZ5YvZ5YvZ5YvZ5YvZ5YvZ5Yv', 'John', 'Doe', 'customer', TRUE, TRUE, NOW(), NOW());

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO Categories (id, name, slug, description, parentId, isActive, sortOrder, createdAt, updatedAt) VALUES
('cat-001', 'Clothing', 'clothing', 'Traditional and modern Moroccan clothing', NULL, TRUE, 1, NOW(), NOW()),
('cat-002', 'Accessories', 'accessories', 'Handcrafted accessories and jewelry', NULL, TRUE, 2, NOW(), NOW()),
('cat-003', 'Home Decor', 'home-decor', 'Beautiful Moroccan home decorations', NULL, TRUE, 3, NOW(), NOW()),
('cat-004', 'Rugs & Carpets', 'rugs-carpets', 'Authentic Moroccan rugs and carpets', NULL, TRUE, 4, NOW(), NOW()),
('cat-005', 'Pottery', 'pottery', 'Traditional Moroccan pottery and ceramics', NULL, TRUE, 5, NOW(), NOW()),
('cat-006', 'Men Clothing', 'men-clothing', 'Traditional clothing for men', 'cat-001', TRUE, 1, NOW(), NOW()),
('cat-007', 'Women Clothing', 'women-clothing', 'Traditional clothing for women', 'cat-001', TRUE, 2, NOW(), NOW());

-- ============================================
-- SEED BRANDS
-- ============================================
INSERT INTO Brands (id, name, slug, description, isActive, createdAt, updatedAt) VALUES
('brand-001', 'Moroccan Artisans', 'moroccan-artisans', 'Authentic handcrafted products from local artisans', TRUE, NOW(), NOW()),
('brand-002', 'Atlas Collection', 'atlas-collection', 'Premium Moroccan products inspired by Atlas Mountains', TRUE, NOW(), NOW()),
('brand-003', 'Sahara Treasures', 'sahara-treasures', 'Unique finds from the Sahara region', TRUE, NOW(), NOW());

-- ============================================
-- SEED PRODUCTS
-- ============================================
INSERT INTO Products (id, name, slug, description, shortDescription, price, compareAtPrice, sku, quantity, categoryId, brandId, status, isFeatured, isVisible, createdAt, updatedAt) VALUES
('prod-001', 'Traditional Moroccan Kaftan', 'traditional-moroccan-kaftan', 'Beautiful handcrafted kaftan with intricate embroidery', 'Elegant traditional kaftan', 149.99, 199.99, 'KAF-001', 25, 'cat-007', 'brand-001', 'active', TRUE, TRUE, NOW(), NOW()),
('prod-002', 'Berber Rug - Medium', 'berber-rug-medium', 'Authentic Berber rug handwoven by artisans', 'Handwoven Berber rug', 299.99, 399.99, 'RUG-001', 10, 'cat-004', 'brand-002', 'active', TRUE, TRUE, NOW(), NOW()),
('prod-003', 'Moroccan Leather Pouf', 'moroccan-leather-pouf', 'Genuine leather pouf with traditional stitching', 'Handcrafted leather pouf', 89.99, 119.99, 'POUF-001', 50, 'cat-003', 'brand-001', 'active', FALSE, TRUE, NOW(), NOW()),
('prod-004', 'Tagine Cooking Pot', 'tagine-cooking-pot', 'Traditional ceramic tagine for authentic Moroccan cooking', 'Ceramic tagine pot', 45.99, NULL, 'TAG-001', 100, 'cat-005', 'brand-003', 'active', TRUE, TRUE, NOW(), NOW()),
('prod-005', 'Silver Berber Necklace', 'silver-berber-necklace', 'Handcrafted silver necklace with traditional Berber design', 'Traditional silver necklace', 129.99, 159.99, 'NECK-001', 15, 'cat-002', 'brand-001', 'active', FALSE, TRUE, NOW(), NOW());

-- ============================================
-- SEED WAREHOUSES
-- ============================================
INSERT INTO Warehouses (id, name, code, isActive, capacity, createdAt, updatedAt) VALUES
('wh-001', 'Main Warehouse - Casablanca', 'WH-CASA', TRUE, 10000, NOW(), NOW()),
('wh-002', 'Secondary Warehouse - Marrakech', 'WH-MARR', TRUE, 5000, NOW(), NOW());

-- ============================================
-- SEED INVENTORY
-- ============================================
INSERT INTO Inventories (id, productId, variantId, warehouseId, quantity, reserved, reorderPoint, reorderQuantity, createdAt, updatedAt) VALUES
('inv-001', 'prod-001', NULL, 'wh-001', 20, 0, 5, 20, NOW(), NOW()),
('inv-002', 'prod-001', NULL, 'wh-002', 5, 0, 5, 10, NOW(), NOW()),
('inv-003', 'prod-002', NULL, 'wh-001', 8, 0, 3, 10, NOW(), NOW()),
('inv-004', 'prod-003', NULL, 'wh-001', 50, 0, 10, 30, NOW(), NOW()),
('inv-005', 'prod-004', NULL, 'wh-001', 100, 0, 20, 50, NOW(), NOW()),
('inv-006', 'prod-005', NULL, 'wh-001', 15, 0, 5, 15, NOW(), NOW());

-- ============================================
-- SEED SHIPPERS
-- ============================================
INSERT INTO Shippers (id, name, code, trackingUrl, isActive, createdAt, updatedAt) VALUES
('ship-001', 'DHL Express', 'DHL', 'https://www.dhl.com/tracking?id={tracking}', TRUE, NOW(), NOW()),
('ship-002', 'FedEx International', 'FEDEX', 'https://www.fedex.com/tracking?id={tracking}', TRUE, NOW(), NOW()),
('ship-003', 'UPS Worldwide', 'UPS', 'https://www.ups.com/tracking?id={tracking}', TRUE, NOW(), NOW());

-- ============================================
-- SEED TAX RATES
-- ============================================
INSERT INTO TaxRates (id, name, rate, region, country, isActive, priority, createdAt, updatedAt) VALUES
('tax-001', 'Morocco VAT', 0.2000, 'National', 'MA', TRUE, 1, NOW(), NOW()),
('tax-002', 'EU VAT Standard', 0.2100, 'EU', 'EU', TRUE, 2, NOW(), NOW()),
('tax-003', 'US Sales Tax', 0.0750, 'California', 'US', TRUE, 3, NOW(), NOW());

-- ============================================
-- SEED COUPONS
-- ============================================
INSERT INTO Coupons (id, code, type, value, minPurchase, usageLimit, usageCount, startsAt, expiresAt, isActive, createdAt, updatedAt) VALUES
('coup-001', 'WELCOME10', 'percentage', 10.00, 50.00, 1000, 0, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), TRUE, NOW(), NOW()),
('coup-002', 'FREESHIP', 'free_shipping', 0.00, 100.00, 500, 0, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), TRUE, NOW(), NOW()),
('coup-003', 'SAVE20', 'fixed', 20.00, 150.00, 200, 0, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), TRUE, NOW(), NOW());

-- ============================================
-- SEED PAGES (CMS)
-- ============================================
INSERT INTO Pages (id, title, slug, content, metaTitle, metaDescription, isPublished, publishedAt, createdAt, updatedAt) VALUES
('page-001', 'About Us', 'about-us', '<h1>About Tailored Bridge</h1><p>We bring authentic Moroccan craftsmanship to the world...</p>', 'About Us - Tailored Bridge', 'Learn about our mission to connect artisans with global customers', TRUE, NOW(), NOW(), NOW()),
('page-002', 'Shipping Policy', 'shipping-policy', '<h1>Shipping Policy</h1><p>We ship worldwide...</p>', 'Shipping Policy', 'Our shipping terms and conditions', TRUE, NOW(), NOW(), NOW()),
('page-003', 'Return Policy', 'return-policy', '<h1>Return Policy</h1><p>30-day return guarantee...</p>', 'Return Policy', 'Our return and refund policy', TRUE, NOW(), NOW(), NOW());

-- ============================================
-- SEED ROLES & PERMISSIONS
-- ============================================
INSERT INTO Roles (id, name, description, createdAt, updatedAt) VALUES
('role-001', 'admin', 'Full system access', NOW(), NOW()),
('role-002', 'manager', 'Store management access', NOW(), NOW()),
('role-003', 'customer', 'Customer access', NOW(), NOW()),
('role-004', 'vendor', 'Vendor access', NOW(), NOW());

INSERT INTO Permissions (id, name, resource, action, description, createdAt, updatedAt) VALUES
('perm-001', 'products.create', 'products', 'create', 'Create new products', NOW(), NOW()),
('perm-002', 'products.read', 'products', 'read', 'View products', NOW(), NOW()),
('perm-003', 'products.update', 'products', 'update', 'Update products', NOW(), NOW()),
('perm-004', 'products.delete', 'products', 'delete', 'Delete products', NOW(), NOW()),
('perm-005', 'orders.manage', 'orders', 'manage', 'Manage all orders', NOW(), NOW()),
('perm-006', 'users.manage', 'users', 'manage', 'Manage users', NOW(), NOW());

-- ============================================
-- SEED VENDORS
-- ============================================
INSERT INTO Vendors (id, name, email, phone, commissionRate, status, createdAt, updatedAt) VALUES
('vend-001', 'Marrakech Artisan Collective', 'contact@marrakech-artisans.ma', '+212-5-24-123456', 15.00, 'active', NOW(), NOW()),
('vend-002', 'Fez Pottery Masters', 'info@fezpottery.ma', '+212-5-35-654321', 12.00, 'active', NOW(), NOW());

-- ============================================
-- SEED SAMPLE ORDER
-- ============================================
INSERT INTO Orders (id, orderNumber, userId, status, subtotal, tax, shipping, discount, total, paymentMethod, paymentStatus, createdAt, updatedAt) VALUES
('order-001', 'ORD-2024-00001', '550e8400-e29b-41d4-a716-446655440001', 'delivered', 149.99, 30.00, 15.00, 0.00, 194.99, 'credit_card', 'paid', DATE_SUB(NOW(), INTERVAL 7 DAY), NOW());

INSERT INTO OrderItems (id, orderId, productId, productName, quantity, price, total, createdAt, updatedAt) VALUES
('oi-001', 'order-001', 'prod-001', 'Traditional Moroccan Kaftan', 1, 149.99, 149.99, DATE_SUB(NOW(), INTERVAL 7 DAY), NOW());

INSERT INTO Payments (id, orderId, amount, currency, method, status, transactionId, createdAt, updatedAt) VALUES
('pay-001', 'order-001', 194.99, 'USD', 'credit_card', 'completed', 'TXN-' || UUID(), DATE_SUB(NOW(), INTERVAL 7 DAY), NOW());

-- ============================================
-- SEED REVIEWS
-- ============================================
INSERT INTO Reviews (id, productId, userId, rating, title, comment, isVerified, isApproved, helpfulCount, createdAt, updatedAt) VALUES
('rev-001', 'prod-001', '550e8400-e29b-41d4-a716-446655440001', 5, 'Beautiful Kaftan!', 'Absolutely stunning! The quality is exceptional and the embroidery is exquisite.', TRUE, TRUE, 12, DATE_SUB(NOW(), INTERVAL 3 DAY), NOW()),
('rev-002', 'prod-002', '550e8400-e29b-41d4-a716-446655440001', 5, 'Authentic and Beautiful', 'This rug is exactly what I was looking for. Truly authentic Berber craftsmanship.', TRUE, TRUE, 8, DATE_SUB(NOW(), INTERVAL 5 DAY), NOW());

-- ============================================
-- SEED NOTIFICATIONS
-- ============================================
INSERT INTO Notifications (id, userId, type, title, message, isRead, createdAt, updatedAt) VALUES
('notif-001', '550e8400-e29b-41d4-a716-446655440001', 'ORDER_SHIPPED', 'Your order has been shipped', 'Order #ORD-2024-00001 is on its way!', FALSE, DATE_SUB(NOW(), INTERVAL 1 DAY), NOW()),
('notif-002', '550e8400-e29b-41d4-a716-446655440001', 'PROMOTION', 'Special Offer', 'Get 10% off your next purchase with code WELCOME10', FALSE, NOW(), NOW());

-- ============================================
-- END OF SEED DATA
-- ============================================
