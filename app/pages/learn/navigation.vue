<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 03</p>
        <h1>useRoute 与 useRouter</h1>
        <p class="lead">
          useRoute 用来读取当前路由，useRouter 用来主动跳转。一个负责“看当前位置”，一个负责“带用户去别处”。
        </p>

        <div class="lesson-steps">
          <article>
            <h2>1. 读取当前路由</h2>
            <pre><code>{{ routeSnapshot }}</code></pre>
          </article>

          <article>
            <h2>2. 切换 query 参数</h2>
            <p class="summary">当前 tab：{{ currentTab }}</p>
            <div class="link-row">
              <button
                v-for="item in tabs"
                :key="item.value"
                type="button"
                :class="{ active: currentTab === item.value }"
                @click="switchTab(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </article>

          <article>
            <h2>3. 程序式跳转到产品详情</h2>
            <div class="link-row">
              <button
                v-for="product in products"
                :key="product.slug"
                type="button"
                @click="goToProduct(product.category, product.slug)"
              >
                {{ product.name }}
              </button>
            </div>
          </article>

          <article>
            <h2>4. 对应代码</h2>
            <pre><code>const route = useRoute()
const router = useRouter()

await router.push({
  path: '/learn/navigation',
  query: { tab: 'phones' },
})

await router.push(`/products/${category}/${slug}`)</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { products, type ProductCategory } from '~/data/catalog'

const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: 'Nuxt 导航逻辑学习 - Nuxt Lab',
  description: '学习 useRoute、useRouter、query 参数和程序式跳转。',
})

const tabs = [
  { label: '电脑', value: 'laptops' },
  { label: '手机', value: 'phones' },
  { label: '穿戴', value: 'wearables' },
  { label: 'Pad', value: 'tablets' },
]

const currentTab = computed(() => String(route.query.tab ?? 'laptops'))

const routeSnapshot = computed(() =>
  JSON.stringify(
    {
      path: route.path,
      fullPath: route.fullPath,
      query: route.query,
      params: route.params,
    },
    null,
    2,
  ),
)

async function switchTab(tab: string) {
  await router.push({
    path: '/learn/navigation',
    query: { tab },
  })
}

async function goToProduct(category: ProductCategory, slug: string) {
  await router.push(`/products/${category}/${slug}`)
}
</script>
