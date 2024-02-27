import { sql } from '@vercel/postgres';
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

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<Revenue>`SELECT * FROM starter_revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
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

    const data = await sql<LatestInvoiceRaw>`
      SELECT starter_invoices.amount, starter_customers.name, starter_customers.image_url, starter_customers.email, starter_invoices.id
      FROM starter_invoices
      JOIN starter_customers ON starter_invoices.customer_id = starter_customers.id
      ORDER BY starter_invoices.date DESC
      LIMIT 5`;

    return data.rows.map((invoice) => ({
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
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM starter_invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM starter_customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM starter_invoices`;

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
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
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
        starter_customers.name ILIKE ${`%${query}%`} OR
        starter_customers.email ILIKE ${`%${query}%`} OR
        starter_invoices.amount::text ILIKE ${`%${query}%`} OR
        starter_invoices.date::text ILIKE ${`%${query}%`} OR
        starter_invoices.status ILIKE ${`%${query}%`}
      ORDER BY starter_invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM starter_invoices
    JOIN starter_customers ON starter_invoices.customer_id = starter_customers.id
    WHERE
      starter_customers.name ILIKE ${`%${query}%`} OR
      starter_customers.email ILIKE ${`%${query}%`} OR
      starter_invoices.amount::text ILIKE ${`%${query}%`} OR
      starter_invoices.date::text ILIKE ${`%${query}%`} OR
      starter_invoices.status ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    const data = await sql<InvoiceForm>`
      SELECT
        starter_invoices.id,
        starter_invoices.customer_id,
        starter_invoices.amount,
        starter_invoices.status
      FROM starter_invoices
      WHERE starter_invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
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
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM starter_customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
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
		  starter_customers.name ILIKE ${`%${query}%`} OR
        starter_customers.email ILIKE ${`%${query}%`}
		GROUP BY starter_customers.id, starter_customers.name, starter_customers.email, starter_customers.image_url
		ORDER BY starter_customers.name ASC
	  `;

    return data.rows.map((customer) => ({
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
    const user = await sql`SELECT * FROM starter_users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
