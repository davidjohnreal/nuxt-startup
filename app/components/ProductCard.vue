<template>
  <article class="product-card">
    <NuxtImg
      :src="product.hero"
      :alt="product.name"
      class="product-image"
      width="960"
      height="720"
      sizes="100vw md:50vw lg:33vw"
      format="webp"
    />
    <div class="product-body">
      <p class="eyebrow">{{ categoryLabel }}</p>
      <h3>{{ product.name }}</h3>
      <p class="tagline">{{ product.tagline }}</p>
      <p class="summary">{{ product.summary }}</p>
      <div class="spec-list">
        <span v-for="spec in product.specs" :key="spec">{{ spec }}</span>
      </div>
      <NuxtLink class="card-link" :to="`/products/${product.category}/${product.slug}`">
        查看详情
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/data/catalog'

defineProps<{
  product: ProductItem
  categoryLabel: string
}>()
</script>
