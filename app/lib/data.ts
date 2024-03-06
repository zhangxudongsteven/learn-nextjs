import { Pool } from 'pg';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  User,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function fetchRevenue() {
  noStore();

  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { rows } = await pool.query<Revenue>('SELECT * FROM starter_revenue');

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();

  try {
    console.log('Fetching invoice data...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { rows } = await pool.query<LatestInvoiceRaw>(`
      SELECT starter_invoices.amount, starter_customers.name, starter_customers.image_url, starter_customers.email, starter_invoices.id
      FROM starter_invoices
      JOIN starter_customers ON starter_invoices.customer_id = starter_customers.id
      ORDER BY starter_invoices.date DESC
      LIMIT 5
    `);

    return rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();

  try {
    const invoiceCountPromise = pool.query('SELECT COUNT(*) FROM starter_invoices');
    const customerCountPromise = pool.query('SELECT COUNT(*) FROM starter_customers');
    const invoiceStatusPromise = pool.query(`
      SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
      FROM starter_invoices
    `);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await pool.query<InvoicesTable>(`
      SELECT
        starter_invoices.id,
        starter_invoices.amount,
        starter_invoices.date,
        starter_invoices.status,
        starter_customers.name,
        starter_customers.email,
        starter_customers.image_url
      FROM starter_invoices
      JOIN starter_customers ON starter_invoices.customer_id = starter_customers.id
      WHERE
        starter_customers.name ILIKE $1 OR
        starter_customers.email ILIKE $1 OR
        starter_invoices.amount::text ILIKE $1 OR
        starter_invoices.date::text ILIKE $1 OR
        starter_invoices.status ILIKE $1
      ORDER BY starter_invoices.date DESC
      LIMIT $2 OFFSET $3
    `, [`%${query}%`, ITEMS_PER_PAGE, offset]);

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();

  try {
    const { rows } = await pool.query(`
      SELECT COUNT(*)
      FROM starter_invoices
      JOIN starter_customers ON starter_invoices.customer_id = starter_customers.id
      WHERE
        starter_customers.name ILIKE $1 OR
        starter_customers.email ILIKE $1 OR
        starter_invoices.amount::text ILIKE $1 OR
        starter_invoices.date::text ILIKE $1 OR
        starter_invoices.status ILIKE $1
    `, [`%${query}%`]);

    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    const { rows } = await pool.query<InvoiceForm>(`
      SELECT
        starter_invoices.id,
        starter_invoices.customer_id,
        starter_invoices.amount,
        starter_invoices.status
      FROM starter_invoices
      WHERE starter_invoices.id = $1
    `, [id]);

    const invoice = rows.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const { rows } = await pool.query<CustomerField>(`
      SELECT
        id,
        name
      FROM starter_customers
      ORDER BY name ASC
    `);

    return rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const { rows } = await pool.query<CustomersTableType>(`
      SELECT
        starter_customers.id,
        starter_customers.name,
        starter_customers.email,
        starter_customers.image_url,
        COUNT(starter_invoices.id) AS total_invoices,
        SUM(CASE WHEN starter_invoices.status = 'pending' THEN starter_invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN starter_invoices.status = 'paid' THEN starter_invoices.amount ELSE 0 END) AS total_paid
      FROM starter_customers
      LEFT JOIN starter_invoices ON starter_customers.id = starter_invoices.customer_id
      WHERE
        starter_customers.name ILIKE $1 OR
        starter_customers.email ILIKE $1
      GROUP BY starter_customers.id, starter_customers.name, starter_customers.email, starter_customers.image_url
      ORDER BY starter_customers.name ASC
    `, [`%${query}%`]);

    return rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const { rows } = await pool.query<User>('SELECT * FROM starter_users WHERE email=$1', [email]);
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}