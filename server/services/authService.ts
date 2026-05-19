import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)

export interface AuthUserRecord {
  id: number
  email: string
  name: string
  password_hash: string
  password_salt: string
  created_at: Date | string
}

export interface AuthUserPublic {
  id: number
  email: string
  name: string
  createdAt: string
}

export interface AuthTokenPayload {
  sub: number
  email: string
  name: string
  iat: number
}

export function normalizeUser(user: AuthUserRecord): AuthUserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: new Date(user.created_at).toISOString(),
  }
}

export async function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer

  return {
    salt,
    hash: derivedKey.toString('hex'),
  }
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const { hash } = await hashPassword(password, salt)
  const actual = Buffer.from(hash, 'hex')
  const expected = Buffer.from(expectedHash, 'hex')

  if (actual.length !== expected.length) {
    return false
  }

  return timingSafeEqual(actual, expected)
}

export function signAuthToken(payload: Omit<AuthTokenPayload, 'iat'>) {
  const config = useRuntimeConfig()
  const body: AuthTokenPayload = {
    ...payload,
    iat: Date.now(),
  }

  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url')
  const signature = createHmac('sha256', config.authTokenSecret).update(encoded).digest('base64url')

  return `${encoded}.${signature}`
}

export function verifyAuthToken(token: string) {
  const config = useRuntimeConfig()
  const [encoded, signature] = token.split('.')

  if (!encoded || !signature) {
    return null
  }

  const expected = createHmac('sha256', config.authTokenSecret).update(encoded).digest('base64url')

  if (expected !== signature) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AuthTokenPayload
  }
  catch {
    return null
  }
}

export function hashEmail(email: string) {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex')
}
