import { normalizeUser, signAuthToken, verifyPassword } from '../../services/authService'
import { findUserByEmail } from '../../services/userRepository'
import { normalizeEmail, normalizePassword } from '../../utils/authInput'

interface LoginBody {
  email?: string
  password?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event)
  const email = normalizeEmail(body.email)
  const password = normalizePassword(body.password)
  const user = await findUserByEmail(email)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'email or password is incorrect',
    })
  }

  const passwordOk = await verifyPassword(password, user.password_salt, user.password_hash)

  if (!passwordOk) {
    throw createError({
      statusCode: 401,
      statusMessage: 'email or password is incorrect',
    })
  }

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
