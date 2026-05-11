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
        </div>

        <div class="hero-panel">
          <NuxtImg
            :src="product.hero"
            :alt="product.name"
            class="hero-image"
            width="1200"
            height="900"
            format="webp"
          />
        </div>
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
})
</script>
