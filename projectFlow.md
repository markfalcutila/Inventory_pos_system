Table Name	
Category	
    -Groups products (e.g., Beverages, Snacks)

Product	
    -Stores product info (price, SKU, barcode, stock, etc.)

Role	
    -Manages permissions for user types (Admin, Manager, etc.)

Users	
    -Login and profile info; linked to Role

Sales	
    -Represents a full sale/transaction (invoice, date, total, cashier)

Sales_Items	
    -Line items inside each sale (product, qty, price, subtotal)

Payment	
    -Records how a sale was paid (cash, card, GCash, etc.)

Setting	
    -System-wide configs (tax rate, currency, etc.)

Suppliers
    -Who the business buys from (for inventory restock)

Stock_movement
    -History log for inventory changes (stock in/out, adjustments, etc.)

===================

🧠 HOW THEY WORK TOGETHER (Flow)
1. Users log in
Authenticated by Users table

Permissions enforced via Role.permissions (JSON)

2. Cashier makes a sale
Creates record in Sales table

For each product sold → record in Sales_Items

When payment is confirmed → record in Payment

System deducts product stock

A Stock_movement is created to track stock deduction

3. Inventory is restocked
Admin inputs stock purchases from Suppliers

New stock is added to Product.stock

Each restock logs a new Stock_movement

4. Admin sets up system
Updates Setting (e.g., tax rate)

Manages Category, Product, Supplier entries

Controls Role permissions and creates Users

==========================

🔁 Example Minimal Flow for Testing
Here’s how to insert in a sample session:

✅ Insert Role (Admin, Cashier, etc.)

✅ Insert User (admin/admin123)

✅ Insert Category (e.g., Beverages)

✅ Insert Supplier (e.g., Coke Distributor)

✅ Insert Product (e.g., Coke) with category

✅ Insert Stock_movement (e.g., +100 Coke)

✅ Insert Sale (e.g., Sale #1 by cashier)

✅ Insert Sales_Item (e.g., 2 Coke @ 20.00)

✅ Insert Payment (e.g., Cash 40.00)

==============================