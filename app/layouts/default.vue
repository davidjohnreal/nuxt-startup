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
          <NuxtLink to="/learn/routing">路由学习</NuxtLink>
          <NuxtLink to="/learn/navigation?tab=phones">导航逻辑</NuxtLink>
          <NuxtLink to="/learn/data-fetching?category=phones">数据获取</NuxtLink>
          <NuxtLink to="/learn/fetch-tools">获取工具</NuxtLink>
          <NuxtLink to="/learn/server-api">服务端 API</NuxtLink>
          <NuxtLink to="/learn/seo">SEO</NuxtLink>
          <NuxtLink to="/learn/images">图片优化</NuxtLink>
          <NuxtLink to="/learn/rendering">渲染模式</NuxtLink>
          <NuxtLink to="/learn/components">组件工程化</NuxtLink>
          <NuxtLink to="/learn/content-sources">内容来源</NuxtLink>
          <NuxtLink to="/learn/cms-sdk">CMS SDK</NuxtLink>
          <NuxtLink to="/learn/markdown-content">Markdown</NuxtLink>
          <NuxtLink to="/learn/performance">性能优化</NuxtLink>
          <NuxtLink to="/learn/deployment">部署上线</NuxtLink>
          <NuxtLink to="/learn/project-standards">项目规范</NuxtLink>
          <NuxtLink to="/learn/capstone">综合实战</NuxtLink>
          <NuxtLink to="/learn/animations">动画交互</NuxtLink>
          <NuxtLink to="/campaigns/spring-launch">专题</NuxtLink>
          <NuxtLink to="/support">支持</NuxtLink>
          <NuxtLink to="/account">用户中心</NuxtLink>
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
