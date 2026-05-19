import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getMySqlPool } from '../db/mysql'
import type { AuthUserRecord } from './authService'

type AuthUserRow = RowDataPacket & AuthUserRecord

const authUsersSchema = `CREATE TABLE IF NOT EXISTS auth_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(160) NOT NULL,
  password_salt VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

export async function ensureAuthUsersTable() {
  await getMySqlPool().execute(authUsersSchema)
}

export async function findUserByEmail(email: string) {
  await ensureAuthUsersTable()

  const [rows] = await getMySqlPool().execute<AuthUserRow[]>(
    `SELECT id, email, name, password_hash, password_salt, created_at
     FROM auth_users
     WHERE email = ?
     LIMIT 1`,
    [email],
  )

  return rows[0] ?? null
}

export async function findUserById(id: number) {
  await ensureAuthUsersTable()

  const [rows] = await getMySqlPool().execute<AuthUserRow[]>(
    `SELECT id, email, name, password_hash, password_salt, created_at
     FROM auth_users
     WHERE id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ?? null
}

export async function createUser(input: {
  email: string
  name: string
  passwordHash: string
  passwordSalt: string
}) {
  await ensureAuthUsersTable()

  const [result] = await getMySqlPool().execute<ResultSetHeader>(
    `INSERT INTO auth_users (email, name, password_hash, password_salt)
     VALUES (?, ?, ?, ?)`,
    [input.email, input.name, input.passwordHash, input.passwordSalt],
  )

  const user = await findUserById(result.insertId)

  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user',
    })
  }

  return user
}
