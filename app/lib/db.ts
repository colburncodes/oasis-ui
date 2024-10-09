'use server';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;

/**
 * Executes a SQL query on the database.
 * 
 * This function manages the database connection lifecycle:
 * it obtains a client from the connection pool, executes the query,
 * and releases the client back to the pool. It also handles
 * parameterized queries to prevent SQL injection attacks.
 *
 * @param text - The SQL query text or a QueryArrayConfig object
 * @param params - An array of values to be used in the parameterized query
 * @returns A promise that resolves to the query result
 * 
 * @example
 * // Simple query
 * const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
 * 
 * @example
 * // Query with multiple parameters
 * const result = await query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email]);
 */
export async function query(text: string | pkg.QueryArrayConfig<any>, params: any[] | undefined) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch(error) {
    console.error('Database Error:', error);
    throw error;
  }
  finally {
    client.release();
  }
}