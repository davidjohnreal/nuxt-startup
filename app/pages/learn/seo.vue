<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 07</p>
        <h1>SEO、useHead 与 useSeoMeta</h1>
        <p class="lead">
          对官网来说，页面不只是要好看和快，还要让搜索引擎、社交分享和浏览器标签页都拿到正确的信息。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">useSeoMeta</p>
            <h2>更适合常见 SEO 字段</h2>
            <pre><code>useSeoMeta({
  title: 'Nuxt Lab',
  description: '科技官网学习项目',
  ogTitle: 'Nuxt Lab',
  ogDescription: '科技官网学习项目',
})</code></pre>
            <p>适合 title、description、Open Graph、Twitter Card 这类常见 SEO 信息。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">useHead</p>
            <h2>更通用的 head 控制</h2>
            <pre><code>useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [{ rel: 'canonical', href: canonicalUrl }],
})</code></pre>
            <p>适合 `htmlAttrs`、`bodyAttrs`、`link`、自定义 `meta` 和脚本标签。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">title</p>
            <h2>浏览器标题和搜索结果标题</h2>
            <pre><code>Nuxt Lab - 科技官网学习项目</code></pre>
            <p>这是最先该设置的字段，用户标签页和搜索结果通常都会用到。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">description</p>
            <h2>搜索摘要和分享描述</h2>
            <pre><code>一个用于学习 Nuxt 的科技型企业官网骨架</code></pre>
            <p>描述应简洁准确，别堆关键词，也别和页面正文完全无关。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>当前页面设置了什么</h2>
            <pre><code>{{ headSnapshot }}</code></pre>
          </article>

          <article>
            <h2>在业务页里的真实用法</h2>
            <pre><code>useSeoMeta({
  title: () => `${product.name} - ${categoryInfo.label}`,
  description: () => product.summary,
  ogTitle: () => product.name,
  ogDescription: () => product.summary,
  ogImage: () => product.hero,
})</code></pre>
          </article>

          <article>
            <h2>什么时候该用哪一个</h2>
            <pre><code>SEO 字段：优先 useSeoMeta
canonical / lang / script / link：用 useHead
复杂页面：两者一起用</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const canonicalUrl = 'https://nuxt-lab.example.com/learn/seo'

useSeoMeta({
  title: 'Nuxt SEO 学习 - Nuxt Lab',
  description: '学习 useSeoMeta、useHead、Open Graph 和产品页面 SEO 的基本做法。',
  ogTitle: 'Nuxt SEO 学习 - Nuxt Lab',
  ogDescription: '学习 useSeoMeta、useHead、Open Graph 和产品页面 SEO 的基本做法。',
  ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],
})

const headSnapshot = computed(() =>
  JSON.stringify(
    {
      title: 'Nuxt SEO 学习 - Nuxt Lab',
      description: '学习 useSeoMeta、useHead、Open Graph 和产品页面 SEO 的基本做法。',
      ogTitle: 'Nuxt SEO 学习 - Nuxt Lab',
      ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
      canonical: canonicalUrl,
      lang: 'zh-CN',
    },
    null,
    2,
  ),
)
</script>
