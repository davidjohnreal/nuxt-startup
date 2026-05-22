<template>
  <div class="page">
    <section class="brand-hero">
      <NuxtImg
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80"
        alt="Nuxt Lab integrated technology website"
        class="brand-hero-image"
        width="1800"
        height="1100"
        sizes="100vw"
        format="webp"
        priority
      />
      <div class="brand-hero-overlay">
        <div class="container brand-hero-copy">
          <p class="eyebrow">Lesson 18 Capstone</p>
          <h1>综合实战：完整科技企业官网</h1>
          <p class="lead">
            把首页、分类、详情、账户中心、SEO、图片优化和缓存策略串起来，看一个 Nuxt 官网项目如何从页面结构走向可上线的工程。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/" class="primary-btn">打开官网首页</NuxtLink>
            <NuxtLink to="/products/phones/orion-phone-ultra" class="secondary-btn">
              查看主推产品
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Site map</p>
          <h2>真实科技官网的核心页面链路</h2>
        </div>

        <div class="route-table">
          <article
            v-for="entry in siteMap"
            :key="entry.path"
            class="route-card"
          >
            <p class="eyebrow">{{ entry.layer }}</p>
            <h2>{{ entry.title }}</h2>
            <pre><code>{{ entry.path }}</code></pre>
            <p>{{ entry.description }}</p>
            <div class="link-row">
              <NuxtLink :to="entry.path">访问页面</NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content-source-layout">
        <aside class="content-source-sidebar">
          <article>
            <h2>综合实战验收清单</h2>
            <ul>
              <li>首页 Hero 用 `NuxtImg priority` 承接第一屏视觉。</li>
              <li>产品分类页用动态路由 `/products/[category]`。</li>
              <li>产品详情页用 `/products/[category]/[slug]` 和动态 SEO。</li>
              <li>账户中心用 CSR 规则承接登录态和本地 token。</li>
              <li>SEO 用 `useSeoMeta` 与 `useHead` 管理标题、描述、OG、canonical。</li>
              <li>图片用 `@nuxt/image`、`sizes`、`format`、固定宽高减少抖动。</li>
              <li>缓存用 `routeRules` 区分官网内容页和用户私有页。</li>
            </ul>
          </article>

          <article>
            <h2>你现在该重点看什么</h2>
            <pre><code>app/pages/index.vue
app/pages/products/[category]/index.vue
app/pages/products/[category]/[slug].vue
app/pages/account/index.vue
nuxt.config.ts
app/data/catalog.ts</code></pre>
          </article>
        </aside>

        <div class="content-source-main">
          <section class="component-panel">
            <div class="section-heading">
              <p class="eyebrow">Product system</p>
              <h2>四个分类和详情页来自同一份产品模型</h2>
            </div>
            <div class="source-card-grid">
              <NuxtLink
                v-for="item in categoryEntries"
                :key="item.key"
                :to="`/products/${item.key}`"
                class="source-card"
              >
                <p class="eyebrow">{{ item.key }}</p>
                <h3>{{ item.label }}</h3>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </section>

          <section class="component-panel">
            <div class="section-heading">
              <p class="eyebrow">Featured detail</p>
              <h2>详情页负责承接产品决策</h2>
            </div>
            <ProductCard
              :product="featuredProduct"
              :category-label="categories[featuredProduct.category].label"
            />
          </section>

          <section class="component-panel">
            <h2>SEO、图片和缓存策略快照</h2>
            <pre><code>{{ strategySnapshot }}</code></pre>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, products } from '~/data/catalog'
import type { ProductItem } from '~/data/catalog'
const canonicalUrl = 'https://nuxt-lab.example.com/learn/capstone'

useSeoMeta({
  title: 'Nuxt 综合实战 - 完整科技企业官网',
  description: '用 Nuxt 串联首页、分类、详情、账户中心、SEO、图片优化和缓存策略，完成科技企业官网综合实战。',
  ogTitle: 'Nuxt 综合实战 - 完整科技企业官网',
  ogDescription: '学习一个 Nuxt 科技企业官网从页面结构到上线策略的完整组合方式。',
  ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],
})

const featuredProduct = products.find(product => product.slug === 'orion-phone-ultra') ?? products[0] as ProductItem

const categoryEntries = Object.entries(categories).map(([key, value]) => ({
  key,
  ...value,
}))

const siteMap = [
  {
    layer: 'home',
    title: '首页',
    path: '/',
    description: '当季主题、新品 Hero、核心分类和精选产品，是官网首屏转化入口。',
  },
  {
    layer: 'category',
    title: '手机分类页',
    path: '/products/phones',
    description: '动态分类页，用同一个页面模板展示不同产品线。',
  },
  {
    layer: 'detail',
    title: '主推产品详情页',
    path: '/products/phones/orion-phone-ultra',
    description: '动态详情页，结合产品数据生成标题、描述、OG 图和 canonical。',
  },
  {
    layer: 'campaign',
    title: '新品专题页',
    path: '/campaigns/spring-launch',
    description: '活动页适合预渲染或强缓存，承接发布会、节日营销和主题故事。',
  },
  {
    layer: 'account',
    title: '账户中心',
    path: '/account',
    description: '用户私有区域采用 CSR，登录态和本地 token 在客户端处理。',
  },
  {
    layer: 'support',
    title: '支持页',
    path: '/support',
    description: '购买咨询、售后、检索和服务入口，负责官网的后半段体验。',
  },
]

const strategySnapshot = computed(() =>
  JSON.stringify(
    {
      seo: {
        composables: ['useSeoMeta', 'useHead'],
        fields: ['title', 'description', 'ogTitle', 'ogImage', 'twitterCard', 'canonical'],
      },
      images: {
        module: '@nuxt/image',
        component: 'NuxtImg',
        hero: 'priority + width/height + sizes="100vw" + webp',
        product: 'sizes="100vw lg:50vw"',
      },
      renderingAndCache: {
        '/': { swr: 3600 },
        '/products/**': { swr: 3600 },
        '/campaigns/**': { prerender: true },
        '/account/**': { ssr: false },
      },
      nextRealProjectStep: '把 catalog.ts 替换成 CMS、数据库或后端 API，并保留同样的页面边界。',
    },
    null,
    2,
  ),
)
</script>
