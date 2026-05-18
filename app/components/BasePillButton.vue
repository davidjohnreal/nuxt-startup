<template>
  <button
    type="button"
    class="pill-button"
    :class="{ active }"
    @click="$emit('select')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean
}>()

defineEmits<{
  select: []
}>()
</script>
