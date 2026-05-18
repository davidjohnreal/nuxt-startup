import { products } from '~/data/catalog'

export const useCartStore = defineStore('cart', () => {
  const items = ref<string[]>([])

  const count = computed(() => items.value.length)
  const uniqueItems = computed(() => [...new Set(items.value)])
  const productsInCart = computed(() =>
    uniqueItems.value
      .map(slug => products.find(product => product.slug === slug))
      .filter(Boolean),
  )

  function add(slug: string) {
    items.value = [...items.value, slug]
  }

  function remove(slug: string) {
    const index = items.value.indexOf(slug)

    if (index === -1) {
      return
    }

    items.value = items.value.toSpliced(index, 1)
  }

  function clear() {
    items.value = []
  }

  return {
    add,
    clear,
    count,
    items,
    productsInCart,
    remove,
    uniqueItems,
  }
})
