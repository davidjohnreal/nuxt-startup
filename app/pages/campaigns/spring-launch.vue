<template>
  <div class="page">
    <section class="campaign-hero">
      <NuxtImg
        src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1800&q=80"
        alt="Spring Launch product desk"
        class="brand-hero-image"
        width="1800"
        height="1050"
        sizes="100vw"
        format="webp"
      />
      <div class="brand-hero-overlay">
        <div class="container brand-hero-copy">
          <p class="eyebrow">活动专题页</p>
          <h1>Spring Launch</h1>
          <p class="lead">
            活动专题页通常围绕当季主推产品组织内容，用更强的视觉和更短的路径，把用户带到详情页或购买咨询。
          </p>
          <div class="hero-actions">
            <NuxtLink to="/products/phones/orion-phone-ultra" class="primary-btn">
              Orion Phone Ultra
            </NuxtLink>
            <NuxtLink to="/products/laptops/nova-book-pro" class="secondary-btn">
              Nova Book Pro
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Featured lineup</p>
          <h2>专题页会精选产品，而不是展示全部库存</h2>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in campaignProducts"
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
  title: 'Spring Launch 活动专题 - Nuxt Lab',
  description: '学习真实科技官网中的活动专题页结构和主推产品动线。',
})

const campaignProducts = products.filter(product =>
  ['orion-phone-ultra', 'nova-book-pro'].includes(product.slug),
)
</script>
