import pg from 'pg'

let pool: pg.Pool | null = null

export function getPostgresPool() {
  const config = useRuntimeConfig()

  if (!config.postgresUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'POSTGRES_URL is not configured',
    })
  }

  pool ??= new pg.Pool({
    connectionString: config.postgresUrl,
    max: 10,
  })

  return pool
}
