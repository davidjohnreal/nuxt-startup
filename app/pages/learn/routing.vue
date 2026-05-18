<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 02</p>
        <h1>Nuxt 文件路由与动态路由</h1>
        <p class="lead">
          Nuxt 会根据 app/pages 目录自动生成路由。你不用手写 routes 数组，
          只要按文件名组织页面，URL 就会自然出现。
        </p>

        <div class="route-table">
          <article v-for="item in routeExamples" :key="item.file" class="route-card">
            <p class="eyebrow">{{ item.type }}</p>
            <h2>{{ item.url }}</h2>
            <pre><code>{{ item.file }}</code></pre>
            <p>{{ item.description }}</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>当前页面的 route 信息</h2>
            <pre><code>{{ routeSnapshot }}</code></pre>
          </article>

          <article>
            <h2>动态路由读取方式</h2>
            <pre><code>const route = useRoute()
const category = route.params.category
const slug = route.params.slug</code></pre>
          </article>

          <article>
            <h2>试试看这些真实页面</h2>
            <div class="link-row">
              <NuxtLink to="/products/laptops">/products/laptops</NuxtLink>
              <NuxtLink to="/products/phones/orion-phone-ultra">
                /products/phones/orion-phone-ultra
              </NuxtLink>
              <NuxtLink to="/products/tablets/nova-pad-air">
                /products/tablets/nova-pad-air
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: 'Nuxt 文件路由学习 - Nuxt Lab',
  description: '通过 Nuxt pages 目录理解静态路由、动态路由和 route.params。',
})

const routeExamples = [
  {
    type: '静态路由',
    file: 'app/pages/index.vue',
    url: '/',
    description: 'index.vue 在 pages 根目录下时，对应网站首页。',
  },
  {
    type: '静态路由',
    file: 'app/pages/learn/routing.vue',
    url: '/learn/routing',
    description: '普通文件名会直接成为 URL 的一部分。',
  },
  {
    type: '动态路由',
    file: 'app/pages/products/[category]/index.vue',
    url: '/products/:category',
    description: '[category] 表示这一段 URL 是动态参数，可以读取 route.params.category。',
  },
  {
    type: '多级动态路由',
    file: 'app/pages/products/[category]/[slug].vue',
    url: '/products/:category/:slug',
    description: '多个中括号可以组合，用很少页面承载大量详情页。',
  },
]

const routeSnapshot = computed(() =>
  JSON.stringify(
    {
      path: route.path,
      name: route.name,
      params: route.params,
      query: route.query,
    },
    null,
    2,
  ),
)
</script>
