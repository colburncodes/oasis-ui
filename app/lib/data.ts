import { query } from './db';
import {
  CustomersTableType,
  Invoice,
  InvoicesTable,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    const data = await query('SELECT * FROM revenue', []);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await query(`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `, []);

    const latestInvoices = data.rows.map((invoice: Invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
export async function fetchCardData() {
  try {
    const [invoiceCountResult, customerCountResult, invoiceStatusResult] = await Promise.all([
      query('SELECT COUNT(*) FROM invoices', []),
      query('SELECT COUNT(*) FROM customers', []),
      query(`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices`, []),
    ]);

    const numberOfInvoices = Number(invoiceCountResult.rows[0].count ?? '0');
    const numberOfCustomers = Number(customerCountResult.rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(invoiceStatusResult.rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(invoiceStatusResult.rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch(error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }

}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(searchQuery: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await query(`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
      ORDER BY invoices.date DESC
      LIMIT $2 OFFSET $3
    `, [`%${searchQuery}%`, ITEMS_PER_PAGE, offset]);

    const invoices = data.rows.map((invoice: InvoicesTable) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoiceCount(searchQuery: string) {
  try {
    const data = await query(`
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1 OR
        invoices.amount::text ILIKE $1 OR
        invoices.date::text ILIKE $1 OR
        invoices.status ILIKE $1
    `, [`%${searchQuery}%`]);

    return Number(data.rows[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice count.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await query(`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = $1;
    `, [id]);

    const invoice = data.rows.map((invoice: Invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: formatCurrency(invoice.amount),
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await query('SELECT * FROM customers', []);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchFilteredCustomers(searchQuery: string) {
  try {
    const data = await query(`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE $1 OR
        customers.email ILIKE $1
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `, [`%${searchQuery}%`]);

    const customers = data.rows.map((customer: CustomersTableType) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch(error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered customers.');
  }
}
