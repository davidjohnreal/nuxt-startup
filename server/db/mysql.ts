import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getMySqlPool() {
  const config = useRuntimeConfig()

  if (!config.mysqlUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MYSQL_URL is not configured',
    })
  }

  pool ??= mysql.createPool({
    uri: config.mysqlUrl,
    connectionLimit: 10,
    enableKeepAlive: true,
  })

  return pool
}
