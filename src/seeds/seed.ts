import { AppDataSource } from "../ormconfig";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { Setting } from "../entity/Setting";
import { Sales } from "../entity/Sales";
import { Payment } from "../entity/Payment";
import bcrypt from "bcryptjs";
import { SaleItems } from "../entity/Sales_items";
import { StockMovement } from "../entity/Stock_movement";

async function seed() {
    await AppDataSource.initialize();

    // --- Seed Roles ---
    const roles = [
        { name: 'Admin', permissions: '{"can_manage_users": true, "can_view_reports": true, "can_process_sales": true, "can_edit_inventory": true}' },
        { name: 'Manager', permissions: '{"can_view_reports": true, "can_process_sales": true}' },
        { name: 'Cashier', permissions: '{"can_process_sales": true}' },
    ];
    for (const data of roles) {
        const existing = await Role.findOneBy({ name: data.name });
        if (!existing) {
            await Role.create(data).save();
            console.log(`✅ Seeded role: ${data.name}`);
        }
    }

    // --- Seed Users ---
    const users = [
        { username: 'admin', name: 'admin', password: 'admin123', role: 'Admin' },
        { username: 'manager', name: 'manager', password: 'manager123', role: 'Manager' },
        { username: 'cashier', name: 'cashier', password: 'cashier123', role: 'Cashier' },
    ];
    for (const data of users) {
        const existing = await User.findOneBy({ username: data.username });
        if (!existing) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const role = await Role.findOneBy({ name: data.role });
            if (role) {
                await User.create({ ...data, password: hashedPassword, role }).save();
                console.log(`✅ Seeded user: ${data.username}`);
            }
        }
    }

    // --- Seed Categories ---
    const categories = [
        { name: 'Beverages', description: 'Drinks such as coffee, tea, etc.' },
        { name: 'Snacks', description: 'Fast food and small snacks' },
    ];
    for (const data of categories) {
        const existing = await Category.findOneBy({ name: data.name });
        if (!existing) {
            await Category.create(data as Category).save();
            console.log(`✅ Seeded category: ${data.name}`);
        }
    }

    // --- Seed Products ---
    const products = [
        { name: 'Espresso Coffee', sku: 'ESCOFFEE01', barcode: '123456789', category: 1, price: 150.00, cost: 80.00, stock: 100, unit: 'cup', is_active: true },
        { name: 'Lemonade', sku: 'LEMONADE01', barcode: '987654321', category: 1, price: 100.00, cost: 50.00, stock: 80, unit: 'cup', is_active: true },
        { name: 'Sandwich', sku: 'SANDWICH01', barcode: '112233445', category: 1, price: 120.00, cost: 70.00, stock: 50, unit: 'piece', is_active: true },
    ];
    for (const data of products) {
        const category = await Category.findOneBy({ id: data.category });
        if (category) {
            const existing = await Product.findOneBy({ name: data.name });
            if (!existing) {
                await Product.create({ ...data, category }).save();
                console.log(`✅ Seeded product: ${data.name}`);
            }
        }
    }

    // --- Seed Settings ---
    const settings = [
        { key: 'tax_rate', value: '0.12' },
        { key: 'currency', value: 'PHP' },
    ];
    for (const data of settings) {
        const existing = await Setting.findOneBy({ key: data.key });
        if (!existing) {
            await Setting.create(data as Setting).save();
            console.log(`✅ Seeded setting: ${data.key}`);
        }
    }

    // --- Seed Sales ---
    const user = await User.findOneBy({ username: 'cashier' });
    if (user) {
        const existingSale = await Sales.findOneBy({ invoice_no: 'INV001' });
        if (!existingSale) {
            const sale = Sales.create({
                invoice_no: 'INV001',
                user_id: user.id,
                total_amount: 270.00,
                discount: 30.00,
                payment_type: 0,
                date: new Date(),
            });
            await sale.save();
            console.log(`✅ Seeded sale: ${sale.invoice_no}`);

            // --- Seed SaleItems ---
            const product1 = await Product.findOneBy({ name: 'Espresso Coffee' });
            const product2 = await Product.findOneBy({ name: 'Sandwich' });

            if (product1 && product2) {
                const saleItem1 = SaleItems.create({
                    sale,
                    product: product1,
                    quantity: 2,
                    price: product1.price,
                    total: product1.price * 2,
                    discount: 10,
                    ref_no: 'REF001',
                });
                await saleItem1.save();

                const saleItem2 = SaleItems.create({
                    sale,
                    product: product2,
                    quantity: 1,
                    price: product2.price,
                    total: product2.price,
                    discount: 20,
                    ref_no: 'REF002',
                });
                await saleItem2.save();
                console.log(`✅ Seeded sale items for invoice: ${sale.invoice_no}`);
            }

            // --- Seed Payment ---
            const payment = Payment.create({
                sale,
                amount: 270.00,
                method: 0,
                ref_no: 'PAY001',
                payment_date: new Date(),
                note: 'Paid in full',
            });
            await payment.save();
            console.log(`✅ Seeded payment for invoice: ${sale.invoice_no}`);
        }
    }

    // --- Seed Stock Movements ---
    const espresso = await Product.findOneBy({ name: 'Espresso Coffee' });
    const admin = await User.findOneBy({ username: 'admin' });
    if (espresso && admin) {
        const stockMovement = StockMovement.create({
            product: espresso,
            user: admin,
            type: 0, // 0: in, 1: out
            quantity: 50,
            reason: 'Initial stock',
            ref_id: 'REF_STOCK001',
            date: new Date(),
        });
        await stockMovement.save();
        console.log(`✅ Seeded stock movement for product: ${espresso.name}`);
    }

    await AppDataSource.destroy();
    console.log("🎉 All seeding complete.");
}

seed().catch((error) => {
    console.error("❌ Seeding failed:", error);
});
