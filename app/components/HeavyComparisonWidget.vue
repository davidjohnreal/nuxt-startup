<template>
  <div class="perf-widget">
    <div
      v-for="metric in metrics"
      :key="metric.name"
      class="perf-widget-row"
    >
      <span>{{ metric.name }}</span>
      <strong>{{ metric.value }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  { name: 'Hydration work', value: '按需触发' },
  { name: 'Chart code', value: '独立 chunk' },
  { name: 'Main route', value: '保持轻量' },
]
</script>
