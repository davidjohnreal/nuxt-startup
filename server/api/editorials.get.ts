import { editorialArticles } from '../../app/data/content-sources'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const source = typeof query.source === 'string' ? query.source : undefined

  const articles = source
    ? editorialArticles.filter(article => article.source === source)
    : editorialArticles

  return {
    source: source ?? 'all',
    articles,
  }
})
