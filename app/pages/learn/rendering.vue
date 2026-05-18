<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 09</p>
        <h1>SSR、SSG 与 Hybrid Rendering</h1>
        <p class="lead">
          Nuxt 默认会在服务端先渲染页面，再交给浏览器接管。真正做官网时，我们会按页面类型选择不同策略。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">SSR</p>
            <h2>Server-Side Rendering</h2>
            <pre><code>请求进入服务端
服务端获取数据
服务端生成 HTML
浏览器 hydration</code></pre>
            <p>适合需要实时数据、SEO 又重要的页面，比如商品详情、资讯详情。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">SSG</p>
            <h2>Static Site Generation</h2>
            <pre><code>构建时提前生成 HTML
访问时直接返回静态文件</code></pre>
            <p>适合变化很少的页面，比如品牌介绍、帮助中心、固定专题页。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">CSR</p>
            <h2>Client-Side Rendering</h2>
            <pre><code>先给浏览器空壳
浏览器加载 JS
客户端请求数据并渲染</code></pre>
            <p>适合登录后后台、强交互工具、SEO 不重要的页面。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Hybrid</p>
            <h2>按路由混合策略</h2>
            <pre><code>首页：预渲染
产品页：SSR 或缓存
后台页：CSR
API：独立缓存</code></pre>
            <p>大型站点通常不是一种模式跑到底，而是按页面职责组合。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>routeRules 示例</h2>
            <pre><code>routeRules: {
  '/learn/rendering': { prerender: true },
  '/products/**': { swr: 3600 },
  '/admin/**': { ssr: false },
  '/account': { ssr: false },
  '/account/**': { ssr: false },
}</code></pre>
          </article>

          <article>
            <h2>科技官网怎么选</h2>
            <pre><code>首页：预渲染或缓存，追求极快首屏
分类页：SSR + 缓存，兼顾内容更新和 SEO
产品详情页：SSR/SWR，保证数据新鲜度
活动专题页：预渲染，适合高访问量
后台/编辑器：CSR，交互优先</code></pre>
          </article>

          <article>
            <h2>你当前项目的配置</h2>
            <pre><code>{{ routeRulesSnapshot }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 渲染模式学习 - Nuxt Lab',
  description: '学习 SSR、SSG、CSR、Hybrid Rendering 和 routeRules 的基本使用。',
})

const routeRulesSnapshot = JSON.stringify(
    {
    '/learn/rendering': { prerender: true },
    '/products/**': { swr: 3600 },
    '/admin/**': { ssr: false },
    '/account': { ssr: false },
    '/account/**': { ssr: false },
  },
  null,
  2,
)
</script>
