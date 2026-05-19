import type { SqlProvider } from '../services/sqlDemoRepository'

export function parseSqlProvider(value: unknown): SqlProvider {
  if (value === 'mysql' || value === 'postgres') {
    return value
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'provider must be mysql or postgres',
  })
}
