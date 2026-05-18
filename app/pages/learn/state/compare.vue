<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 11 Compare</p>
        <h1>useState 与 ref 的跨页面差异</h1>
        <p class="lead">
          这个页面专门用来观察差异：`useState` 会通过相同 key 读到上一页的共享状态；普通 `ref` 是当前页面组件自己的局部状态。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">shared</p>
            <h2>useState：跨页面共享</h2>
            <pre><code>{{ sharedSnapshot }}</code></pre>
            <p>这些收藏和购物车数据来自 `/learn/state` 页面创建的同名 key。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">local</p>
            <h2>ref：当前页面局部</h2>
            <pre><code>{{ localSnapshot }}</code></pre>
            <p>这个计数只属于当前页面。离开再回来，组件重新创建，通常会回到初始值。</p>
            <div class="link-row">
              <button type="button" @click="localCounter++">
                增加 ref 计数
              </button>
            </div>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>怎么观察</h2>
            <pre><code>1. 回到 /learn/state
2. 收藏几个产品，或加入购物车
3. 再进入 /learn/state/compare
4. useState 数据还在
5. ref 计数是当前页面自己的</code></pre>
            <div class="link-row">
              <NuxtLink to="/learn/state">回到状态管理页</NuxtLink>
              <NuxtLink to="/learn/state/pinia">进入 Pinia 示例</NuxtLink>
              <button type="button" @click="clearSharedState">清空 useState</button>
            </div>
          </article>

          <article>
            <h2>本页核心代码</h2>
            <pre><code>const favoriteProducts = useState&lt;string[]&gt;(
  'favorite-products',
  () => [],
)

const localCounter = ref(0)</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategory } from '~/data/catalog'

interface UserPreferences {
  compactMode: boolean
  showYear: boolean
  defaultCategory: ProductCategory
}

useSeoMeta({
  title: 'useState 与 ref 对照 - Nuxt Lab',
  description: '通过跨页面案例观察 Nuxt useState 与 Vue ref 的区别。',
})

const favoriteProducts = useState<string[]>('favorite-products', () => [])
const cartItems = useState<string[]>('cart-items', () => [])
const preferences = useState<UserPreferences>('user-preferences', () => ({
  compactMode: false,
  showYear: true,
  defaultCategory: 'phones',
}))

const localCounter = ref(0)

const sharedSnapshot = computed(() =>
  JSON.stringify(
    {
      source: 'useState',
      sameKeysAsStatePage: [
        'favorite-products',
        'cart-items',
        'user-preferences',
      ],
      favoriteProducts: favoriteProducts.value,
      cartItems: cartItems.value,
      cartCount: cartItems.value.length,
      preferences: preferences.value,
    },
    null,
    2,
  ),
)

const localSnapshot = computed(() =>
  JSON.stringify(
    {
      source: 'ref',
      localCounter: localCounter.value,
      note: '这个值不会被其他页面用 key 共享。',
    },
    null,
    2,
  ),
)

function clearSharedState() {
  favoriteProducts.value = []
  cartItems.value = []
  preferences.value = {
    compactMode: false,
    showYear: true,
    defaultCategory: 'phones',
  }
}
</script>
