import { AppDataSource } from "../ormconfig";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { Setting } from "../entity/Setting";
import bcrypt from "bcryptjs";

async function seed() {
    await AppDataSource.initialize();

    // Seed Roles
    const roles = [
        { name: 'Admin', permissions: '{"can_manage_users": true, "can_view_reports": true, "can_process_sales": true, "can_edit_inventory": true}' },
        { name: 'Manager', permissions: '{"can_view_reports": true, "can_process_sales": true}' },
        { name: 'Cashier', permissions: '{"can_process_sales": true}' },
    ];

    for (const data of roles) {
        const existing = await Role.findOneBy({ name: data.name });
        if (!existing) {
            const role = Role.create(data);
            await role.save();
            console.log(`Seeded role: ${data.name}`);
        }
    }

    // Seed Users
    const users = [
        { username: 'admin',  name: 'admin', password: 'admin123', role: 'Admin' },
        { username: 'manager', name: 'manager',  password: 'manager123', role: 'Manager' },
        { username: 'cashier', name: 'cashier',  password: 'cashier123', role: 'Cashier' },
    ];

    for (const data of users) {
        const existing = await User.findOneBy({ username: data.username });
        if (!existing) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const role = await Role.findOneBy({ name: data.role });
            if (role) {
                const user = User.create({ ...data, password: hashedPassword, role: role });
                await user.save();
                console.log(`Seeded user: ${data.username}`);
            }
        }
    }

    // Seed Categories
    const categories = [
        { name: 'Beverages', description: 'Drinks such as coffee, tea, etc.' },
        { name: 'Snacks', description: 'Fast food and small snacks' },
    ];

    for (const data of categories) {
        const existing = await Category.findOneBy({ name: data.name });
        if (!existing) {
            const category = Category.create(data as Category);
            await category.save();
            console.log(`Seeded category: ${data.name}`);
        }
    }

    // Seed Products
    const products = [
        { name: 'Espresso Coffee', sku: 'ESCOFFEE01', barcode: '123456789', category_id: 'Beverages', price: 150.00, cost: 80.00, stock: 100, unit: 'cup', is_active: true },
        { name: 'Lemonade', sku: 'LEMONADE01', barcode: '987654321', category_id: 'Beverages', price: 100.00, cost: 50.00, stock: 80, unit: 'cup', is_active: true },
        { name: 'Sandwich', sku: 'SANDWICH01', barcode: '112233445', category_id: 'Snacks', price: 120.00, cost: 70.00, stock: 50, unit: 'piece', is_active: true },
    ];

    for (const data of products) {
        const category = await Category.findOneBy({ name: data.category_id });
        if (category) {
            const existing = await Product.findOneBy({ name: data.name });
            if (!existing) {
                const product = Product.create({
                    ...data,
                    category: category,  // Ensure category_id is properly linked
                });
                await product.save();
                console.log(`Seeded product: ${data.name}`);
            }
        }
    }

    // Seed Settings
    const settings = [
        { key: 'tax_rate', value: '0.12' },
        { key: 'currency', value: 'PHP' },
    ];

    for (const data of settings) {
        const existing = await Setting.findOneBy({ key: data.key });
        if (!existing) {
            const setting = Setting.create(data as Setting);
            await setting.save();
            console.log(`Seeded setting: ${data.key}`);
        }
    }

    await AppDataSource.destroy();
    console.log("✅ Seeding complete.");
}

seed().catch((error) => {
    console.error("❌ Seeding failed:", error);
});
