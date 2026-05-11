<template>
  <div class="page">
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Seasonal showcase</p>
          <h1>为科技品牌打造像官网一样干净、快、稳的 Nuxt 站点</h1>
          <p class="lead">
            你现在学的，不只是写页面，而是如何把首页、分类页、详情页、SEO、图片和数据流拼成一套完整体验。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/products/laptops" class="primary-btn">从电脑分类开始</NuxtLink>
            <NuxtLink to="/products/phones" class="secondary-btn">看手机专题</NuxtLink>
          </div>
        </div>

        <div class="hero-panel">
          <NuxtImg
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
            alt="Modern product showcase"
            class="hero-image"
            width="1200"
            height="900"
            format="webp"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">核心分类</p>
          <h2>官网最常见的内容结构</h2>
        </div>

        <div class="category-grid">
          <NuxtLink
            v-for="item in categoryEntries"
            :key="item.key"
            :to="`/products/${item.key}`"
            class="category-card"
          >
            <h3>{{ item.label }}</h3>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">精选产品</p>
          <h2>练习数据驱动页面的起点</h2>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in featuredProducts"
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
import { categories, products } from '~/data/catalog'

useSeoMeta({
  title: 'Nuxt Lab - 科技官网学习项目',
  description: '一个用于学习 Nuxt 的科技型企业官网骨架，包含首页、分类页和产品详情页。',
})

const featuredProducts = products
const categoryEntries = Object.entries(categories).map(([key, value]) => ({
  key,
  label: value.label,
  description: value.description,
}))
</script>
