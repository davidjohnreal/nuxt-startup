<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 05</p>
        <h1>useFetch、useAsyncData、$fetch</h1>
        <p class="lead">
          三者都能拿数据，但使用位置不同。页面首屏数据优先 useFetch，
          复杂异步组合用 useAsyncData，按钮点击、表单提交这类事件用 $fetch。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">useFetch</p>
            <h2>页面请求 API 的首选</h2>
            <pre><code>const { data } = await useFetch('/api/products', {
  query: { category: 'phones' }
})</code></pre>
            <p>适合在页面加载时请求接口，支持 SSR、缓存、pending、error、refresh。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">useAsyncData</p>
            <h2>自己组织异步逻辑</h2>
            <pre><code>const { data } = await useAsyncData('featured-product', () =>
  $fetch('/api/products/orion-phone-ultra')
)</code></pre>
            <p>适合需要组合多个请求、加工数据、调用非 HTTP 异步函数的场景。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">$fetch</p>
            <h2>事件触发请求</h2>
            <pre><code>const product = await $fetch('/api/products/orion-phone-ultra')</code></pre>
            <p>适合点击按钮、提交表单、客户端临时请求。它本身不管理 pending/error 状态。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">rule</p>
            <h2>一个简单判断</h2>
            <pre><code>页面首屏：useFetch
复杂组合：useAsyncData
用户操作：$fetch</code></pre>
            <p>先按这个经验选，后面再根据缓存、并发、错误处理做细化。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>useFetch 结果</h2>
            <pre><code>{{ fetchSnapshot }}</code></pre>
          </article>

          <article>
            <h2>useAsyncData 结果</h2>
            <pre><code>{{ asyncSnapshot }}</code></pre>
          </article>

          <article>
            <h2>$fetch 事件请求</h2>
            <p class="summary">点击按钮后，请求对应产品详情。</p>
            <div class="link-row">
              <button
                v-for="product in products"
                :key="product.slug"
                type="button"
                @click="loadProduct(product.slug)"
              >
                请求 {{ product.name }}
              </button>
            </div>
            <pre><code>{{ eventSnapshot }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { products, type ProductItem } from '~/data/catalog'

interface ProductsResponse {
  category: string | null
  products: ProductItem[]
}

useSeoMeta({
  title: 'Nuxt 数据获取工具对比 - Nuxt Lab',
  description: '学习 useFetch、useAsyncData、$fetch 的区别和使用场景。',
})

const { data: fetchData, pending: fetchPending, error: fetchError } = await useFetch<ProductsResponse>('/api/products', {
  query: { category: 'phones' },
})

const { data: asyncData, pending: asyncPending, error: asyncError } = await useAsyncData(
  'featured-product',
  async () => {
    const response = await $fetch<ProductsResponse>('/api/products', {
      query: { category: 'phones' },
    })

    return response.products[0] ?? null
  },
)

const eventProduct = ref<ProductItem | null>(null)
const eventError = ref<string | null>(null)
const eventPending = ref(false)

const fetchSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: fetchPending.value,
      hasError: Boolean(fetchError.value),
      category: fetchData.value?.category,
      count: fetchData.value?.products.length ?? 0,
    },
    null,
    2,
  ),
)

const asyncSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: asyncPending.value,
      hasError: Boolean(asyncError.value),
      product: asyncData.value?.name ?? null,
      slug: asyncData.value?.slug ?? null,
    },
    null,
    2,
  ),
)

const eventSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: eventPending.value,
      hasError: Boolean(eventError.value),
      errorMessage: eventError.value,
      product: eventProduct.value?.name ?? null,
      slug: eventProduct.value?.slug ?? null,
    },
    null,
    2,
  ),
)

async function loadProduct(slug: string) {
  eventPending.value = true
  eventError.value = null

  try {
    eventProduct.value = await $fetch<ProductItem>(`/api/products/${slug}`)
  } catch (error) {
    eventError.value = error instanceof Error ? error.message : 'Unknown error'
  } finally {
    eventPending.value = false
  }
}
</script>
