import bcrypt from 'bcrypt';
import { query } from '../lib/db.js';
import { invoices, customers, revenue, users, stores, routes, drivers } from '../lib/placeholder-data';

async function seedUsers() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `, []);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return query(`
        INSERT INTO users (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `, [user.id, user.name, user.email, hashedPassword]);
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
}

async function seedInvoices() {
  await query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `, []);

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) => query(`
      INSERT INTO invoices (id, customer_id, amount, status, date)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING;
    `, [invoice.id, invoice.customer_id, invoice.amount, invoice.status, invoice.date])),
  );

  console.log(`Seeded ${insertedInvoices.length} invoices`);
}

async function seedCustomers() {
  await query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `, []);

  const insertedCustomers = await Promise.all(
    customers.map((customer) => query(`
      INSERT INTO customers (id, name, email, image_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING;
    `, [customer.id, customer.name, customer.email, customer.image_url])),
  );

  console.log(`Seeded ${insertedCustomers.length} customers`);
}

async function seedRevenue() {
  await query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `, []);

  const insertedRevenue = await Promise.all(
    revenue.map((rev) => query(`
      INSERT INTO revenue (month, revenue)
      VALUES ($1, $2)
      ON CONFLICT (month) DO NOTHING;
    `, [rev.month, rev.revenue])),
  );

  console.log(`Seeded ${insertedRevenue.length} revenue entries`);
}

async function seedStores() {
  await query(`
    CREATE TABLE IF NOT EXISTS stores (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      route_id UUID,
      last_delivery_date DATE,
      next_delivery_date DATE
    );
  `, []);

  const insertedStores = await Promise.all(
    stores.map((store) => query(`
      INSERT INTO stores (id, name, address, status, route_id, last_delivery_date, next_delivery_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING;
    `, [store.id, store.name, store.address, store.status, store.route_id, store.last_delivery_date, store.next_delivery_date])),
  );

  console.log(`Seeded ${insertedStores.length} stores`);
}

async function seedRoutes() {
  await query(`
    CREATE TABLE IF NOT EXISTS routes (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) NOT NULL,
      driver_id UUID,
      total_stores INT DEFAULT 0,
      total_active_stores INT DEFAULT 0,
      last_update_date DATE
    );
  `, []);

  const insertedRoutes = await Promise.all(
    routes.map((route) => query(`
      INSERT INTO routes (id, name, description, status, driver_id, total_stores, total_active_stores, last_update_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING;
    `, [route.id, route.name, route.description, route.status, route.driver_id, route.total_stores, route.total_active_stores, route.last_update_date])),
  );

  console.log(`Seeded ${insertedRoutes.length} routes`);
}

async function seedDrivers() {
  await query(`
    CREATE TABLE IF NOT EXISTS drivers (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      license_number VARCHAR(50) UNIQUE NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `, []);

  const insertedDrivers = await Promise.all(
    drivers.map((driver) => query(`
      INSERT INTO drivers (id, name, email, phone, license_number, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING;
    `, [driver.id, driver.name, driver.email, driver.phone, driver.license_number, driver.status])),
  );

  console.log(`Seeded ${insertedDrivers.length} drivers`);
}

async function main() {
  try {
    await query('BEGIN', []);
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    await seedStores();
    await seedRoutes();
    await seedDrivers();
    await query('COMMIT', []);
    console.log('Database seeded successfully');
  } catch (error) {
    await query('ROLLBACK', []);
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

main();