<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 11 Pinia</p>
        <h1>Pinia：用户、购物车与主题状态</h1>
        <p class="lead">
          `useState` 适合轻量共享状态；当状态有明确业务领域、派生数据和动作时，更推荐用 Pinia store。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">user store</p>
            <h2>用户状态</h2>
            <pre><code>{{ userSnapshot }}</code></pre>
            <div class="link-row">
              <button type="button" @click="userStore.signIn">登录</button>
              <button type="button" @click="userStore.signOut">退出</button>
              <button type="button" @click="userStore.toggleMembership">切换会员</button>
            </div>
          </article>

          <article class="route-card">
            <p class="eyebrow">theme store</p>
            <h2>主题设置</h2>
            <pre><code>{{ themeSnapshot }}</code></pre>
            <div class="link-row">
              <button type="button" @click="themeStore.toggleMode">切换主题</button>
              <button type="button" @click="themeStore.toggleDense">切换密度</button>
            </div>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>购物车状态</h2>
            <p>
              购物车是典型的 Pinia 使用场景：多个页面都可能加入、删除、清空商品，同时还需要 `count`、`uniqueItems`、`productsInCart`
              这类派生数据。
            </p>
            <div class="cart-demo-grid">
              <div
                v-for="product in products"
                :key="product.slug"
                class="cart-demo-card"
              >
                <div>
                  <p class="eyebrow">{{ categories[product.category].label }}</p>
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.summary }}</p>
                </div>
                <div class="cart-demo-actions">
                  <button type="button" @click="cartStore.remove(product.slug)">
                    -
                  </button>
                  <strong>{{ getCartQuantity(product.slug) }}</strong>
                  <button type="button" @click="cartStore.add(product.slug)">
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>

          <article>
            <h2>Pinia 快照</h2>
            <pre><code>{{ piniaSnapshot }}</code></pre>
            <div class="link-row">
              <button type="button" @click="cartStore.clear">清空购物车</button>
              <NuxtLink to="/learn/state">回到 useState 示例</NuxtLink>
              <NuxtLink to="/learn/state/compare">查看 useState/ref 对照</NuxtLink>
            </div>
          </article>

          <article>
            <h2>Store 文件</h2>
            <pre><code>app/stores/user.ts
app/stores/cart.ts
app/stores/theme.ts</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, products } from '~/data/catalog'

useSeoMeta({
  title: 'Pinia 状态管理学习 - Nuxt Lab',
  description: '学习 Nuxt 中使用 Pinia 管理用户状态、购物车和主题设置。',
})

const userStore = useUserStore()
const cartStore = useCartStore()
const themeStore = useThemeStore()

function getCartQuantity(slug: string) {
  return cartStore.items.filter(item => item === slug).length
}

const userSnapshot = computed(() =>
  JSON.stringify(
    {
      signedIn: userStore.signedIn,
      displayName: userStore.displayName,
      email: userStore.email,
      membership: userStore.membership,
    },
    null,
    2,
  ),
)

const themeSnapshot = computed(() =>
  JSON.stringify(
    {
      mode: themeStore.mode,
      label: themeStore.label,
      dense: themeStore.dense,
    },
    null,
    2,
  ),
)

const piniaSnapshot = computed(() =>
  JSON.stringify(
    {
      user: {
        signedIn: userStore.signedIn,
        displayName: userStore.displayName,
        membership: userStore.membership,
      },
      cart: {
        items: cartStore.items,
        count: cartStore.count,
        uniqueItems: cartStore.uniqueItems,
        productsInCart: cartStore.productsInCart.map(product => product?.name),
      },
      theme: {
        mode: themeStore.mode,
        dense: themeStore.dense,
      },
    },
    null,
    2,
  ),
)
</script>
