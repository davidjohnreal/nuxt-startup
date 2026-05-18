<template>
  <div class="component-toolbar">
    <BasePillButton
      v-for="option in options"
      :key="option.value"
      :active="modelValue === option.value"
      @select="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </BasePillButton>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategory } from '~/data/catalog'

export type ShowcaseCategoryValue = ProductCategory | 'all'

defineProps<{
  modelValue: ShowcaseCategoryValue
  options: Array<{
    label: string
    value: ShowcaseCategoryValue
  }>
}>()

defineEmits<{
  'update:modelValue': [value: ShowcaseCategoryValue]
}>()
</script>
