<template>
  <div class="component-product-grid">
    <article
      v-for="product in products"
      :key="product.slug"
      class="component-product-card"
    >
      <div>
        <p class="eyebrow">{{ categoryLabels[product.category] }}</p>
        <h3>{{ product.name }}</h3>
        <p>{{ product.summary }}</p>
      </div>

      <slot name="actions" :product="product">
        <NuxtLink :to="`/products/${product.category}/${product.slug}`">
          查看详情
        </NuxtLink>
      </slot>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/data/catalog'

defineProps<{
  products: ProductItem[]
  categoryLabels: Record<ProductCategory, string>
}>()
</script>
