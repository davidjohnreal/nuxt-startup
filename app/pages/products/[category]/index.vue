<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">分类页</p>
        <h1>{{ categoryInfo.label }}</h1>
        <p class="lead">{{ categoryInfo.description }}</p>

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
