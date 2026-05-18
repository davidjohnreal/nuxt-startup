<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 04</p>
        <h1>Nuxt 数据获取</h1>
        <p class="lead">
          useFetch 会在服务端渲染阶段发起请求，把首屏所需数据直接放进 HTML 结果里。
          这就是官网类页面“打开就有内容”的基础能力。
        </p>

        <div class="lesson-steps">
          <article>
            <h2>1. 当前请求</h2>
            <pre><code>useFetch('/api/products', {
  query: { category: currentCategory }
})</code></pre>
          </article>

          <article>
            <h2>2. 用 query 切换 API 数据</h2>
            <p class="summary">当前分类：{{ currentCategory }}</p>
            <div class="link-row">
              <button
                v-for="item in categoryTabs"
                :key="item.value"
                type="button"
                :class="{ active: currentCategory === item.value }"
                @click="switchCategory(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </article>

          <article>
            <h2>3. 请求状态</h2>
            <pre><code>{{ statusSnapshot }}</code></pre>
          </article>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in productList"
            :key="product.slug"
            :product="product"
            :category-label="categories[product.category].label"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, type ProductCategory, type ProductItem } from '~/data/catalog'

interface ProductsResponse {
  category: ProductCategory | null
  products: ProductItem[]
}

const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: 'Nuxt 数据获取学习 - Nuxt Lab',
  description: '学习 useFetch、server/api、query 参数与 SSR 首屏数据。',
})

const categoryTabs = [
  { label: '全部', value: 'all' },
  { label: '电脑', value: 'laptops' },
  { label: '手机', value: 'phones' },
  { label: '穿戴', value: 'wearables' },
  { label: 'Pad', value: 'tablets' },
]

const currentCategory = computed(() => String(route.query.category ?? 'all'))
const productsQuery = computed(() => ({
  category: currentCategory.value === 'all' ? undefined : currentCategory.value,
}))
const productsApiUrl = computed(() =>
  currentCategory.value === 'all'
    ? '/api/products'
    : `/api/products?category=${currentCategory.value}`,
)

const { data, pending, error } = await useFetch<ProductsResponse>('/api/products', {
  key: 'learn-products',
  query: productsQuery,
  watch: [currentCategory],
})

const productList = computed(() => data.value?.products ?? [])

const statusSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: pending.value,
      hasError: Boolean(error.value),
      errorMessage: error.value?.message ?? null,
      requestUrl: productsApiUrl.value,
      count: productList.value.length,
      apiCategory: data.value?.category ?? 'all',
    },
    null,
    2,
  ),
)

async function switchCategory(category: string) {
  await router.push({
    path: '/learn/data-fetching',
    query: { category },
  })
}
</script>
