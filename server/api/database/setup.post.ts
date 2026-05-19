import { ensureLeadTable } from '../../services/sqlDemoRepository'
import { parseSqlProvider } from '../../utils/sqlProvider'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ provider?: string }>(event)
  const provider = parseSqlProvider(body.provider)

  await ensureLeadTable(provider)

  return {
    ok: true,
    provider,
    table: 'demo_leads',
  }
})
