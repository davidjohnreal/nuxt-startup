<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink to="/" class="brand">
          <span class="brand-mark">N</span>
          <span class="brand-text">Nuxt Lab</span>
        </NuxtLink>

        <nav class="nav">
          <NuxtLink to="/learn/nuxt-components">Nuxt 组件</NuxtLink>
          <NuxtLink to="/learn/layouts">布局学习</NuxtLink>
          <NuxtLink to="/products/laptops">电脑</NuxtLink>
          <NuxtLink to="/products/phones">手机</NuxtLink>
          <NuxtLink to="/products/wearables">穿戴</NuxtLink>
          <NuxtLink to="/products/tablets">Pad</NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>Nuxt 学习项目 · 科技官网骨架</p>
        <p>专注首屏、数据、SEO、图片和结构化内容</p>
      </div>
    </footer>
  </div>
</template>
