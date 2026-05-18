<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <div class="category-landing">
          <div>
            <p class="eyebrow">分类页</p>
            <h1>{{ categoryInfo.label }}</h1>
            <p class="lead">{{ categoryInfo.description }}</p>
            <div class="link-row">
              <NuxtLink to="/campaigns/spring-launch">查看新品专题</NuxtLink>
              <NuxtLink to="/support">获取选购支持</NuxtLink>
            </div>
          </div>

          <div class="route-card">
            <p class="eyebrow">Category route</p>
            <pre><code>pages/products/[category]/index.vue
route.params.category = {{ category }}</code></pre>
          </div>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in categoryProducts"
            :key="product.slug"
            :product="product"
            :category-label="categoryInfo.label"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories, getProductsByCategory, type ProductCategory } from '~/data/catalog'

const route = useRoute()
const category = route.params.category as ProductCategory
const categoryInfo = categories[category] ?? categories.laptops
const categoryProducts = getProductsByCategory(category)

useSeoMeta({
  title: () => `${categoryInfo.label} - Nuxt Lab`,
  description: () => categoryInfo.description,
})
</script>
