<template>
  <article class="route-card">
    <p class="eyebrow">{{ categoryLabel }}</p>
    <h2>{{ product.name }}</h2>
    <p>{{ product.summary }}</p>
    <div class="link-row">
      <button
        type="button"
        :class="{ active: isFavorite }"
        @click="$emit('toggleFavorite', product.slug)"
      >
        {{ isFavorite ? '已收藏' : '收藏' }}
      </button>
      <button type="button" @click="$emit('addToCart', product.slug)">
        加入购物车
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/data/catalog'

defineProps<{
  product: ProductItem
  categoryLabel: string
  isFavorite: boolean
}>()

defineEmits<{
  toggleFavorite: [slug: string]
  addToCart: [slug: string]
}>()
</script>
