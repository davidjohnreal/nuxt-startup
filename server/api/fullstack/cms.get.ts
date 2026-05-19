import { getCmsEntries } from '../../services/cmsClient'

export default defineEventHandler(async () => {
  const entries = await getCmsEntries()

  return {
    source: 'mock-cms-sdk',
    count: entries.length,
    entries,
  }
})
