<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 14补课 CMS SDK</p>
        <h1>CMS SDK 实战：在 Nuxt 服务端读取 Contentful</h1>
        <p class="lead">
          真实项目里不要让浏览器拿 CMS token 直连 CMS。更常见的做法是页面请求 Nuxt API，Nuxt 服务端读取私有环境变量，再调用 CMS SDK。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">1 env</p>
            <h2>密钥放服务端环境变量</h2>
            <pre><code>CONTENTFUL_SPACE_ID=...
CONTENTFUL_DELIVERY_TOKEN=...
CONTENTFUL_CONTENT_TYPE=editorial</code></pre>
            <p>这些值只进入 `runtimeConfig` 私有区，不放进 `runtimeConfig.public`。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">2 server api</p>
            <h2>页面只请求 Nuxt API</h2>
            <pre><code>useFetch('/api/fullstack/cms')</code></pre>
            <p>浏览器看不到 CMS Space、Token、SDK 细节。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">3 service</p>
            <h2>服务层调用官方 SDK</h2>
            <pre><code>createClient({
  space,
  accessToken,
}).getEntries(...)</code></pre>
            <p>`server/services/cmsClient.ts` 负责和 CMS 通信。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">4 normalize</p>
            <h2>统一返回前端需要的字段</h2>
            <pre><code>id / title / slot / status / updatedAt</code></pre>
            <p>不要把 CMS 原始大对象直接透传给页面。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>当前 SDK 请求结果</h2>
            <div class="link-row">
              <button type="button" @click="refresh">
                重新请求 CMS SDK API
              </button>
            </div>
            <pre><code>{{ cmsSnapshot }}</code></pre>
          </article>

          <article>
            <h2>真实项目文件位置</h2>
            <pre><code>nuxt.config.ts
server/api/fullstack/cms.get.ts
server/services/cmsClient.ts
.env.example</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface CmsResponse {
  source: string
  provider: string
  mode: 'live-sdk' | 'config-missing'
  count: number
  missingEnv?: string[]
  sdkCall: string
  entries: Array<{
    id: string
    title: string
    slot: string
    status: string
    summary: string
    updatedAt: string
  }>
}

useSeoMeta({
  title: 'CMS SDK 实战学习 - Nuxt Lab',
  description: '学习 Nuxt 服务端如何通过 Contentful SDK 读取 CMS 内容，并保护服务端密钥。',
})

const {
  data: cmsData,
  pending,
  error,
  refresh,
} = await useFetch<CmsResponse>('/api/fullstack/cms', {
  key: 'learn-cms-sdk',
})

const cmsSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: pending.value,
      hasError: Boolean(error.value),
      source: cmsData.value?.source,
      provider: cmsData.value?.provider,
      mode: cmsData.value?.mode,
      missingEnv: cmsData.value?.missingEnv ?? [],
      sdkCall: cmsData.value?.sdkCall,
      count: cmsData.value?.count ?? 0,
      entries: cmsData.value?.entries ?? [],
      nextStep: cmsData.value?.mode === 'config-missing'
        ? '在 .env 中填入 Contentful 的 Space ID、Delivery Token 和 Content Type 后重启 dev server。'
        : '已经通过 Contentful SDK 读取到真实 CMS 内容。',
    },
    null,
    2,
  ),
)
</script>
