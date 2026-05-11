<template>
  <div class="custom-shell">
    <header class="custom-header">
      <NuxtLink to="/" class="brand">
        <span class="brand-mark">N</span>
        <span class="brand-text">Nuxt Lab</span>
      </NuxtLink>

      <NuxtLink to="/learn/nuxt-components" class="secondary-btn">
        返回组件速查
      </NuxtLink>
    </header>

    <main class="custom-main">
      <slot />
    </main>
  </div>
</template>
