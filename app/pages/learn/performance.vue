<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 15 Performance</p>
        <h1>性能优化：让官网首屏快、资源轻、缓存稳</h1>
        <p class="lead">
          Nuxt 性能优化不是一个开关，而是一组取舍：首屏资源、代码分割、图片策略、缓存策略和 Lighthouse 指标要一起看。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">首屏资源</p>
            <h2>先加载第一屏真正需要的东西</h2>
            <pre><code>&lt;NuxtImg priority /&gt;
减少首屏 JS
避免首屏请求过多接口</code></pre>
            <p>首屏 Hero、标题、主 CTA 要尽快出现；非首屏模块可以推迟加载。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">代码分割</p>
            <h2>重组件延后加载</h2>
            <pre><code>&lt;LazyHeavyComparisonWidget v-if="showHeavyWidget" /&gt;</code></pre>
            <p>Nuxt 会自动把页面拆 chunk，`Lazy` 前缀组件还能把不立即需要的组件延后。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">图片策略</p>
            <h2>尺寸、格式、优先级一起定</h2>
            <pre><code>width / height
sizes
format="webp"
priority</code></pre>
            <p>图片优化不是只压缩，还要让不同设备拿到合适宽度，并避免布局抖动。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">缓存策略</p>
            <h2>按页面职责配置 routeRules</h2>
            <pre><code>首页：预渲染或 SWR
产品页：SWR
账户页：CSR
API：短缓存或不缓存</code></pre>
            <p>内容越稳定，越适合缓存；用户私有数据通常不应该共享缓存。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>代码分割演示</h2>
            <p>
              下面这个组件使用 `LazyHeavyComparisonWidget`。只有点击按钮后才渲染，用来模拟图表、编辑器、3D 视图这类重组件。
            </p>
            <div class="link-row">
              <button type="button" @click="showHeavyWidget = !showHeavyWidget">
                {{ showHeavyWidget ? '卸载重组件' : '加载重组件' }}
              </button>
            </div>
            <LazyHeavyComparisonWidget v-if="showHeavyWidget" />
          </article>

          <article>
            <h2>图片优化演示</h2>
            <NuxtPicture
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80"
              sizes="100vw md:80vw lg:50vw"
              format="webp"
              :img-attrs="{
                alt: 'Performance hero media',
                class: 'hero-image',
                width: 1200,
                height: 760,
              }"
            />
          </article>

          <article>
            <h2>当前缓存策略</h2>
            <pre><code>{{ routeRulesSnapshot }}</code></pre>
          </article>

          <article>
            <h2>Lighthouse 观察指标</h2>
            <div class="source-card-grid">
              <article
                v-for="metric in lighthouseMetrics"
                :key="metric.name"
                class="source-card"
              >
                <p class="eyebrow">{{ metric.name }}</p>
                <h3>{{ metric.target }}</h3>
                <p>{{ metric.meaning }}</p>
              </article>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '性能优化学习 - Nuxt Lab',
  description: '学习 Nuxt 中首屏资源、代码分割、图片策略、缓存策略和 Lighthouse 指标。',
})

const showHeavyWidget = ref(false)

const routeRulesSnapshot = JSON.stringify(
  {
    '/': { swr: 3600 },
    '/campaigns/**': { swr: 3600 },
    '/products/**': { swr: 3600 },
    '/api/editorials': { swr: 300 },
    '/account/**': { ssr: false },
  },
  null,
  2,
)

const lighthouseMetrics = [
  {
    name: 'LCP',
    target: '< 2.5s',
    meaning: '最大内容元素出现时间，通常受首屏大图、字体和服务端响应影响。',
  },
  {
    name: 'CLS',
    target: '< 0.1',
    meaning: '布局稳定性，图片 width/height、固定容器比例都能减少抖动。',
  },
  {
    name: 'INP',
    target: '< 200ms',
    meaning: '交互响应速度，减少主线程 JS 和拆分重组件很关键。',
  },
  {
    name: 'TTFB',
    target: '< 800ms',
    meaning: '服务端首字节时间，和 SSR 数据请求、缓存、部署地区有关。',
  },
]
</script>
