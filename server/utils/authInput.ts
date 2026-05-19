export function normalizeEmail(email: unknown) {
  if (typeof email !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'email is required',
    })
  }

  const normalized = email.trim().toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'email is invalid',
    })
  }

  return normalized
}

export function normalizeName(name: unknown) {
  if (typeof name !== 'string' || name.trim().length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'name must be at least 2 characters',
    })
  }

  return name.trim().slice(0, 120)
}

export function normalizePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'password must be at least 8 characters',
    })
  }

  return password
}

export function getBearerToken(event: Parameters<typeof getHeader>[0]) {
  const authorization = getHeader(event, 'authorization')

  if (!authorization?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Bearer token is required',
    })
  }

  return authorization.slice('Bearer '.length)
}
