<template>
  <div class="page">
    <section class="section">
      <div class="container detail-grid">
        <div>
          <p class="eyebrow">{{ categoryInfo.label }}</p>
          <h1>{{ product.name }}</h1>
          <p class="lead">{{ product.tagline }}</p>
          <p class="summary">{{ product.summary }}</p>

          <div class="spec-list detail-specs">
            <span>{{ product.year }}</span>
            <span>{{ product.color }}</span>
            <span v-for="spec in product.specs" :key="spec">{{ spec }}</span>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/support" class="primary-btn">咨询购买</NuxtLink>
            <NuxtLink :to="`/products/${product.category}`" class="secondary-btn">
              返回{{ categoryInfo.label }}
            </NuxtLink>
          </div>
        </div>

        <div class="hero-panel">
          <NuxtImg
            :src="product.hero"
            :alt="product.name"
            class="hero-image"
            width="1200"
            height="900"
            sizes="100vw lg:50vw"
            format="webp"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container product-story-grid">
        <article>
          <p class="eyebrow">Product story</p>
          <h2>详情页负责把卖点讲完整</h2>
          <p>
            分类页解决“我想看哪一类”，详情页解决“为什么选这一款”。真实官网通常会继续展开影像、性能、设计、配件、服务等模块。
          </p>
        </article>
        <article>
          <p class="eyebrow">Route shape</p>
          <pre><code>pages/products/[category]/[slug].vue
category = {{ category }}
slug = {{ slug }}</code></pre>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, getProductBySlug, type ProductCategory } from '~/data/catalog'

const route = useRoute()
const category = route.params.category as ProductCategory
const slug = route.params.slug as string
const categoryInfo = categories[category] ?? categories.laptops
const product = getProductBySlug(slug)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useSeoMeta({
  title: () => `${product.name} - ${categoryInfo.label}`,
  description: () => product.summary,
  ogTitle: () => `${product.name} - ${categoryInfo.label}`,
  ogDescription: () => product.summary,
  ogImage: () => product.hero,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://nuxt-lab.example.com/products/${product.category}/${product.slug}`,
    },
  ],
})
</script>
