<template>
  <div class="page">
    <section class="brand-hero gaussian-home-hero">
      <div class="gaussian-client-host">
        <GaussianSplatHero v-if="isGaussianReady" />
        <div v-else class="gaussian-hero-canvas gaussian-hero-fallback" />
      </div>
      <div class="gaussian-hero-glow" />
      <div class="brand-hero-overlay">
        <div class="container brand-hero-copy">
          <p class="eyebrow">Spring Launch · Neural Rendering</p>
          <h1>Nuxt Lab 2026 空间计算新品</h1>
          <p class="lead">
            用高斯泼溅式实时粒子场景打造第一屏视觉记忆，再通过分类页、详情页和专题页承接完整的科技官网动线。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/campaigns/spring-launch" class="primary-btn">查看当季专题</NuxtLink>
            <NuxtLink to="/products/phones/orion-phone-ultra" class="secondary-btn">主推产品</NuxtLink>
          </div>
        </div>
        <div class="gaussian-hero-note">
          <strong>Gaussian Splatting Lab</strong>
          <span>拖动背景可观察实时神经渲染粒子云</span>
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
      <div class="container feature-band">
        <div>
          <p class="eyebrow">官网动线</p>
          <h2>从新品主题进入，再分流到分类、详情和支持</h2>
          <p class="lead">
            科技官网常见结构不是随机堆页面，而是先用主题产品建立第一印象，再通过分类页承接浏览，用详情页推动决策，最后用支持页处理售后和服务。
          </p>
        </div>
        <div class="link-row">
          <NuxtLink to="/campaigns/spring-launch">活动专题页</NuxtLink>
          <NuxtLink to="/support">支持页</NuxtLink>
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

const isGaussianReady = ref(false)

onMounted(() => {
  window.requestAnimationFrame(() => {
    isGaussianReady.value = true
  })
})

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
