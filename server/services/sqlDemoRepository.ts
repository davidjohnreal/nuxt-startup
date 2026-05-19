import { getMySqlPool } from '../db/mysql'
import { getPostgresPool } from '../db/postgres'

export type SqlProvider = 'mysql' | 'postgres'

interface CreateLeadInput {
  name: string
  product: string
  message: string
}

export const mysqlSchema = `CREATE TABLE IF NOT EXISTS demo_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  product VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

export const postgresSchema = `CREATE TABLE IF NOT EXISTS demo_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  product VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`

export async function ensureLeadTable(provider: SqlProvider) {
  if (provider === 'mysql') {
    await getMySqlPool().execute(mysqlSchema)
    return
  }

  await getPostgresPool().query(postgresSchema)
}

export async function createLead(provider: SqlProvider, input: CreateLeadInput) {
  await ensureLeadTable(provider)

  if (provider === 'mysql') {
    const [result] = await getMySqlPool().execute(
      'INSERT INTO demo_leads (name, product, message) VALUES (?, ?, ?)',
      [input.name, input.product, input.message],
    )

    return {
      provider,
      insertedId: 'insertId' in result ? result.insertId : null,
    }
  }

  const result = await getPostgresPool().query<{ id: number }>(
    'INSERT INTO demo_leads (name, product, message) VALUES ($1, $2, $3) RETURNING id',
    [input.name, input.product, input.message],
  )

  return {
    provider,
    insertedId: result.rows[0]?.id ?? null,
  }
}

export async function listLeads(provider: SqlProvider, keyword: string) {
  await ensureLeadTable(provider)

  if (provider === 'mysql') {
    const [rows] = await getMySqlPool().execute(
      `SELECT id, name, product, message, created_at
       FROM demo_leads
       WHERE product LIKE ?
       ORDER BY id DESC
       LIMIT 10`,
      [`%${keyword}%`],
    )

    return rows
  }

  const result = await getPostgresPool().query(
    `SELECT id, name, product, message, created_at
     FROM demo_leads
     WHERE product ILIKE $1
     ORDER BY id DESC
     LIMIT 10`,
    [`%${keyword}%`],
  )

  return result.rows
}
