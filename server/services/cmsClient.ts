import { createClient, type EntrySkeletonType } from 'contentful'

interface ContentfulEditorialFields {
  title?: string
  slot?: string
  status?: string
  summary?: string
}

interface ContentfulEditorialSkeleton extends EntrySkeletonType {
  contentTypeId: string
  fields: ContentfulEditorialFields
}

interface CmsConfig {
  spaceId: string
  deliveryToken: string
  contentType: string
}

export interface CmsEntry {
  id: string
  title: string
  slot: string
  status: string
  summary: string
  updatedAt: string
}

export interface CmsEntriesResult {
  provider: 'contentful'
  mode: 'live-sdk' | 'config-missing'
  count: number
  entries: CmsEntry[]
  missingEnv?: string[]
  sdkCall: string
}

export async function getCmsEntries(config: CmsConfig): Promise<CmsEntriesResult> {
  const missingEnv = [
    ['CONTENTFUL_SPACE_ID', config.spaceId],
    ['CONTENTFUL_DELIVERY_TOKEN', config.deliveryToken],
    ['CONTENTFUL_CONTENT_TYPE', config.contentType],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key)

  const sdkCall = `createClient({ space, accessToken }).getEntries({ content_type: '${config.contentType || 'editorial'}', limit: 6, order: ['-sys.updatedAt'] })`

  if (missingEnv.length > 0) {
    return {
      provider: 'contentful',
      mode: 'config-missing',
      count: 0,
      entries: [],
      missingEnv,
      sdkCall,
    }
  }

  const client = createClient({
    space: config.spaceId,
    accessToken: config.deliveryToken,
  })

  const response = await client.getEntries<ContentfulEditorialSkeleton>({
    content_type: config.contentType,
    limit: 6,
    order: ['-sys.updatedAt'],
  })

  return {
    provider: 'contentful',
    mode: 'live-sdk',
    count: response.items.length,
    entries: response.items.map(item => ({
      id: item.sys.id,
      title: String(item.fields.title ?? 'Untitled CMS entry'),
      slot: String(item.fields.slot ?? 'content-slot'),
      status: String(item.fields.status ?? 'published'),
      summary: String(item.fields.summary ?? ''),
      updatedAt: item.sys.updatedAt,
    })),
    sdkCall,
  }
}
