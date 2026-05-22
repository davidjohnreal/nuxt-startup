import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    editorials: defineCollection({
      type: 'page',
      source: 'editorials/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.string(),
        readingTime: z.string(),
        heroProduct: z.string(),
        tags: z.array(z.string()),
      }),
    }),
  },
})
