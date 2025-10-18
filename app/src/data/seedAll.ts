/**
 * Global Seeder
 * -----------------
 * Seeds all database tables with initial data, in proper dependency order.
 *
 * Reads data from CSV files located in `src/data/`.
 * Uses sequential execution to ensure relational integrity.
 * Prevents duplicate records and logs progress in the console.
 *
 * Entities seeded:
 * 1. Roles
 * 2. Order Status
 * 3. Warehouses
 * 4. Products
 * 5. Clients
 * 6. Addresses
 * 7. Warehouse Stock
 * 8. Users
 */

import fs from "fs";
import csv from "csv-parser";
import path from "path";
import bcrypt from "bcrypt";
import { sequelize } from "../shared/config/db";

// Import models
import { Role } from "../modules/roles/rol.model";
import { OrderStatus } from "../modules/orders/orderStatus.model";
import { Warehouse } from "../modules/warehouses/warehouse.model";
import { Product } from "../modules/products/product.model";
import { Client } from "../modules/clientss/models/client.model";
import { Address } from "../modules/clientss/models/address.model";
import { WarehouseStock } from "../modules/warehouses/warehouseStock.model";
import { User } from "../modules/users/user.model";

// Helper function to read CSV files
const loadCSV = (filename: string) => {
  const fullPath = path.join(__dirname, "../data", filename);
  if (!fs.existsSync(fullPath)) throw new Error(`CSV not found: ${filename}`);

  return new Promise<any[]>((resolve, reject) => {
    const rows: any[] = [];
    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (row: any) => {

        const hasData = Object.values(row).some(val => val && String(val).trim() !== '');
        if (hasData) rows.push(row);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
};

/**
 * Main seeding function
 */
export const seedAll = async () => {
  try {
    console.log("🌱 Starting global seed process...");
    await sequelize.authenticate();

    // 1️⃣ Roles
    const roles = await loadCSV("seed/roles.csv");
    for (const r of roles) {
      const exists = await Role.findOne({ where: { name: r.name } });
      if (!exists) {
        await Role.create({ name: r.name, is_active: r.is_active === "true" });
        console.log(`✓ Role created: ${r.name}`);
      }
    }

    // 2️⃣ Order Status
    const statuses = await loadCSV("seed/order_status.csv");
    for (const s of statuses) {
      const exists = await OrderStatus.findOne({ where: { name: s.name } });
      if (!exists) {
        await OrderStatus.create({
          name: s.name,
          description: s.description,
          is_active: s.is_active === "true",
        });
        console.log(`✓ Status created: ${s.name}`);
      }
    }

    // 3️⃣ Warehouses
    const warehouses = await loadCSV("seed/warehouses.csv");
    for (const w of warehouses) {
      const exists = await Warehouse.findOne({ where: { name: w.name } });
      if (!exists) {
        await Warehouse.create({
          name: w.name,
          is_active: w.is_active === "true",
        });
        console.log(`✓ Warehouse created: ${w.name}`);
      }
    }

    // 4️⃣ Products
    const products = await loadCSV("seed/products.csv");
    for (const p of products) {
      const exists = await Product.findOne({ where: { code: p.code } });
      if (!exists) {
        await Product.create({
          code: p.code,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          is_active: p.is_active === "true",
        });
        console.log(`✓ Product created: ${p.code}`);
      }
    }

    // 5️⃣ Clients
    const clients = await loadCSV("seed/clients.csv");
    for (const c of clients) {
      try {
        if (!c.cedula) continue;
        
        const exists = await Client.findOne({ where: { cedula: c.cedula } });
        if (!exists) {
          await Client.create({
            cedula: c.cedula,
            fullname: c.fullname,
            email: c.email,
            phone: c.phone,
            is_active: c.is_active === "true",
          });
          console.log(`✓ Client created: ${c.fullname}`);
        }
      } catch (error) {
        console.log(`⚠️ Skipped client:`, error instanceof Error ? error.message : error);
      }
    }

    // 6️⃣ Addresses
    const addresses = await loadCSV("seed/addresses.csv");
    for (const a of addresses) {
      try {
        if (!a.client_cedula) continue;
        
        const client = await Client.findOne({ where: { cedula: a.client_cedula } });
        if (client) {
          const exists = await Address.findOne({
            where: { client_id: client.id, street: a.street, number: a.number },
          });
          if (!exists) {
            await Address.create({
              client_id: client.id,
              country: a.country,
              department: a.department,
              city: a.city,
              street: a.street,
              number: a.number,
              is_default: a.is_default === "true",
            });
            console.log(`✓ Address created for: ${client.fullname}`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Skipped address:`, error instanceof Error ? error.message : error);
      }
    }

    // 7️⃣ Warehouse Stock
    const stocks = await loadCSV("seed/warehouse_stock.csv");
    for (const s of stocks) {
      try {
        if (!s.warehouse_name || !s.product_code) continue;
        
        const warehouse = await Warehouse.findOne({ where: { name: s.warehouse_name } });
        const product = await Product.findOne({ where: { code: s.product_code } });
        if (warehouse && product) {
          const existing = await WarehouseStock.findOne({
            where: { warehouse_id: warehouse.id, product_id: product.id },
          });
          if (!existing) {
            await WarehouseStock.create({
              warehouse_id: warehouse.id,
              product_id: product.id,
              quantity: Number(s.quantity),
            });
            console.log(`✓ Stock added: ${warehouse.name} - ${product.code}`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Skipped stock:`, error instanceof Error ? error.message : error);
      }
    }

    // 8️⃣ Users
    const users = await loadCSV("seed/users.csv");
    for (const u of users) {
      try {
        if (!u.email || !u.role_name) continue;
        
        const role = await Role.findOne({ where: { name: u.role_name } });
        const exists = await User.findOne({ where: { email: u.email } });
        if (!exists && role) {
          const hashed = await bcrypt.hash(u.password, 10);
          await User.create({
            name: u.name,
            email: u.email,
            password_hash: hashed,
            role_id: role.id,
            is_active: u.is_active === "true",
          });
          console.log(`✓ User created: ${u.email}`);
        }
      } catch (error) {
        console.log(`⚠️ Skipped user:`, error instanceof Error ? error.message : error);
      }
    }

    console.log("✅ All data seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run directly
if (require.main === module) {
  seedAll();
}