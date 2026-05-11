<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Nuxt basics</p>
        <h1>Nuxt 常用组件速查</h1>
        <p class="lead">
          这些组件不需要手动 import。Nuxt 会自动注册它们，你在页面、布局和组件里可以直接使用。
        </p>

        <div class="learn-grid">
          <article v-for="item in componentNotes" :key="item.name" class="learn-card">
            <div>
              <p class="eyebrow">{{ item.group }}</p>
              <h2>{{ item.name }}</h2>
              <p>{{ item.description }}</p>
            </div>
            <pre><code>{{ item.example }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 常用组件速查 - Nuxt Lab',
  description: 'NuxtLink、NuxtLayout、NuxtPage、NuxtImg 等常用组件的用法示例。',
})

const componentNotes = [
  {
    group: 'routing',
    name: 'NuxtLink',
    description: '用于站内跳转，类似 Vue Router 的 RouterLink，但由 Nuxt 封装。',
    example: `<NuxtLink to="/products/phones">手机</NuxtLink>`,
  },
  {
    group: 'layout',
    name: 'NuxtLayout',
    description: '用于渲染 layouts 目录下的布局。没有指定 name 时默认使用 default.vue。',
    example: `<NuxtLayout>
  <NuxtPage />
</NuxtLayout>`,
  },
  {
    group: 'routing',
    name: 'NuxtPage',
    description: '用于渲染当前路由匹配到的页面，通常放在 app.vue 或布局里。',
    example: `<template>
  <NuxtPage />
</template>`,
  },
  {
    group: 'media',
    name: 'NuxtImg',
    description: '来自 @nuxt/image，用于图片优化、尺寸控制和现代格式输出。',
    example: `<NuxtImg
  src="/product.jpg"
  alt="产品图"
  width="1200"
  height="800"
  format="webp"
/>`,
  },
  {
    group: 'media',
    name: 'NuxtPicture',
    description: '来自 @nuxt/image，用于输出 picture/source，适合多格式、多断点图片。',
    example: `<NuxtPicture
  src="/hero.jpg"
  alt="首页主视觉"
  sizes="100vw md:800px"
/>`,
  },
  {
    group: 'performance',
    name: 'ClientOnly',
    description: '只在浏览器端渲染子组件，适合依赖 window、canvas、地图、编辑器等场景。',
    example: `<ClientOnly>
  <HeavyBrowserWidget />
</ClientOnly>`,
  },
  {
    group: 'teleport',
    name: 'Teleport',
    description: 'Vue 内置组件，常用于弹窗、菜单、通知，把内容挂到 body 等位置。',
    example: `<Teleport to="body">
  <ModalPanel />
</Teleport>`,
  },
]
</script>
