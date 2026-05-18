<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 11</p>
        <h1>状态管理：useState</h1>
        <p class="lead">
          `useState` 是 Nuxt 自带的共享状态工具。它适合保存轻量的应用状态，例如主题、筛选条件、购物车数量、登录用户摘要。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">ref</p>
            <h2>普通 ref</h2>
            <pre><code>const count = ref(0)</code></pre>
            <p>只属于当前组件实例，离开组件或换页面后通常不会作为 Nuxt 全局状态保留。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">useState</p>
            <h2>Nuxt 共享状态</h2>
            <pre><code>const cart = useState('cart', () => [])</code></pre>
            <p>同一个 key 会拿到同一份状态，页面、组件、composable 都可以共享。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">key</p>
            <h2>key 很重要</h2>
            <pre><code>useState('favorite-products')</code></pre>
            <p>key 是状态的名字。名字一样就共享，名字不同就是另一份状态。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">limit</p>
            <h2>适合轻量状态</h2>
            <pre><code>主题、数量、筛选、用户摘要</code></pre>
            <p>复杂业务状态、模块很多的后台系统，后面我们会用 Pinia 管理。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>交互案例</h2>
            <p class="summary">
              下面这些按钮会修改同一份 `useState`。你可以收藏产品、加入购物车、切换偏好，再观察状态快照变化。
            </p>
            <div class="route-table">
              <ProductMiniCard
                v-for="product in products"
                :key="product.slug"
                :product="product"
                :category-label="categories[product.category].label"
                :is-favorite="favoriteProducts.includes(product.slug)"
                @toggle-favorite="toggleFavorite"
                @add-to-cart="addToCart"
              />
            </div>
          </article>

          <article>
            <h2>偏好设置</h2>
            <div class="settings-grid">
              <label class="setting-row">
                <span>紧凑模式</span>
                <input v-model="preferences.compactMode" type="checkbox">
              </label>
              <label class="setting-row">
                <span>显示产品年份</span>
                <input v-model="preferences.showYear" type="checkbox">
              </label>
              <label class="setting-row">
                <span>默认品类</span>
                <select v-model="preferences.defaultCategory">
                  <option value="phones">手机</option>
                  <option value="laptops">电脑</option>
                  <option value="wearables">穿戴设备</option>
                  <option value="tablets">Pad</option>
                </select>
              </label>
            </div>
          </article>

          <article>
            <h2>跨页面观察</h2>
            <p class="summary">
              先在本页收藏产品或加入购物车，再进入对照页。你会看到 `useState` 仍保留数据，而对照页里的普通 `ref` 会重新从初始值开始。
            </p>
            <div class="link-row">
              <NuxtLink to="/learn/state/compare">进入跨页面对照页</NuxtLink>
              <NuxtLink to="/learn/state/pinia">进入 Pinia 业务状态页</NuxtLink>
            </div>
          </article>

          <article>
            <h2>状态快照</h2>
            <pre><code>{{ stateSnapshot }}</code></pre>
            <div class="link-row">
              <button type="button" @click="resetState">重置状态</button>
              <NuxtLink to="/learn/middleware">上一节：路由中间件</NuxtLink>
            </div>
          </article>

          <article>
            <h2>本页核心代码</h2>
            <pre><code>const favoriteProducts = useState&lt;string[]&gt;(
  'favorite-products',
  () => [],
)

const cartItems = useState&lt;string[]&gt;(
  'cart-items',
  () => [],
)

const preferences = useState(
  'user-preferences',
  () => ({
    compactMode: false,
    showYear: true,
    defaultCategory: 'phones',
  }),
)</code></pre>
          </article>

          <article>
            <h2>useState 和 Pinia 怎么选</h2>
            <pre><code>useState：
轻量状态、跨页面共享、简单 key/value

Pinia：
用户状态、购物车、主题设置
有 actions、getters、模块边界
多人协作时更清晰</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, products, type ProductCategory } from '~/data/catalog'

useSeoMeta({
  title: 'Nuxt 状态管理 useState 学习 - Nuxt Lab',
  description: '学习 Nuxt useState 的 key、共享状态、轻量状态管理与适用边界。',
})

interface UserPreferences {
  compactMode: boolean
  showYear: boolean
  defaultCategory: ProductCategory
}

const favoriteProducts = useState<string[]>('favorite-products', () => [])
const cartItems = useState<string[]>('cart-items', () => [])
const preferences = useState<UserPreferences>('user-preferences', () => ({
  compactMode: false,
  showYear: true,
  defaultCategory: 'phones',
}))

const stateSnapshot = computed(() =>
  JSON.stringify(
    {
      page: '/learn/state',
      note: '这些值来自 useState，进入 /learn/state/compare 后仍能读到同一份状态。',
      favoriteProducts: favoriteProducts.value,
      cartItems: cartItems.value,
      cartCount: cartItems.value.length,
      preferences: preferences.value,
    },
    null,
    2,
  ),
)

function toggleFavorite(slug: string) {
  if (favoriteProducts.value.includes(slug)) {
    favoriteProducts.value = favoriteProducts.value.filter(item => item !== slug)
    return
  }

  favoriteProducts.value = [...favoriteProducts.value, slug]
}

function addToCart(slug: string) {
  cartItems.value = [...cartItems.value, slug]
}

function resetState() {
  favoriteProducts.value = []
  cartItems.value = []
  preferences.value = {
    compactMode: false,
    showYear: true,
    defaultCategory: 'phones',
  }
}
</script>
