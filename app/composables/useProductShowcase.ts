import { categories, products, type ProductCategory } from '~/data/catalog'
import type { ShowcaseCategoryValue } from '~/components/ShowcaseCategoryTabs.vue'

export function useProductShowcase() {
  const selectedCategory = ref<ShowcaseCategoryValue>('all')

  const categoryOptions = computed(() => [
    { label: '全部', value: 'all' as const },
    ...Object.entries(categories).map(([value, category]) => ({
      label: category.label,
      value: value as ProductCategory,
    })),
  ])

  const categoryLabels = computed(() =>
    Object.fromEntries(
      Object.entries(categories).map(([value, category]) => [value, category.label]),
    ) as Record<ProductCategory, string>,
  )

  const visibleProducts = computed(() => {
    if (selectedCategory.value === 'all') {
      return products
    }

    return products.filter(product => product.category === selectedCategory.value)
  })

  return {
    categoryLabels,
    categoryOptions,
    selectedCategory,
    visibleProducts,
  }
}
