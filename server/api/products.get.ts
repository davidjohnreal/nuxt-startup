import { categories, getProductsByCategory, products, type ProductCategory } from '../../app/data/catalog'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = query.category as ProductCategory | undefined

  if (category && categories[category]) {
    return {
      category,
      products: getProductsByCategory(category),
    }
  }

  return {
    category: null,
    products,
  }
})
