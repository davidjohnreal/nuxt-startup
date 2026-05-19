import { hashPassword, normalizeUser, signAuthToken } from '../../services/authService'
import { createUser, findUserByEmail } from '../../services/userRepository'
import { normalizeEmail, normalizeName, normalizePassword } from '../../utils/authInput'

interface RegisterBody {
  email?: string
  name?: string
  password?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event)
  const email = normalizeEmail(body.email)
  const name = normalizeName(body.name)
  const password = normalizePassword(body.password)

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'email already registered',
    })
  }

  const { hash, salt } = await hashPassword(password)
  const user = await createUser({
    email,
    name,
    passwordHash: hash,
    passwordSalt: salt,
  })
  const publicUser = normalizeUser(user)
  const token = signAuthToken({
    sub: publicUser.id,
    email: publicUser.email,
    name: publicUser.name,
  })

  return {
    ok: true,
    user: publicUser,
    token,
  }
})
