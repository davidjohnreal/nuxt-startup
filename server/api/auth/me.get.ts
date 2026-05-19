import { normalizeUser, verifyAuthToken } from '../../services/authService'
import { findUserById } from '../../services/userRepository'
import { getBearerToken } from '../../utils/authInput'

export default defineEventHandler(async (event) => {
  const token = getBearerToken(event)
  const payload = verifyAuthToken(token)

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'token is invalid',
    })
  }

  const user = await findUserById(payload.sub)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'user no longer exists',
    })
  }

  return {
    ok: true,
    user: normalizeUser(user),
  }
})
