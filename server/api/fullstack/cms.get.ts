import { getCmsEntries } from '../../services/cmsClient'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const result = await getCmsEntries({
    spaceId: config.contentfulSpaceId,
    deliveryToken: config.contentfulDeliveryToken,
    contentType: config.contentfulContentType,
  })

  return {
    source: 'contentful-sdk',
    ...result,
  }
})
