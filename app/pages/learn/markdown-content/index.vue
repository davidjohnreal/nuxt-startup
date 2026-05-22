<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 14补课 Nuxt Content</p>
        <h1>Markdown / Nuxt Content：把长文内容从组件里拆出去</h1>
        <p class="lead">
          这页是真实 Nuxt Content 范例：Markdown 文件放在 `content/editorials`，集合定义在 `content.config.ts`，页面用 `queryCollection()` 查询并渲染。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">1 content files</p>
            <h2>Markdown 是内容源</h2>
            <pre><code>content/editorials/orion-phone-buying-guide.md
content/editorials/nova-book-creator-workflow.md</code></pre>
            <p>正文、标题、描述、标签、日期都由 Markdown frontmatter 和正文提供。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">2 collection</p>
            <h2>集合负责类型和范围</h2>
            <pre><code>editorials: defineCollection({
  type: 'page',
  source: 'editorials/*.md'
})</code></pre>
            <p>`content.config.ts` 让内容有明确归属，并能对 frontmatter 做类型校验。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">3 query</p>
            <h2>页面像查数据库一样查内容</h2>
            <pre><code>queryCollection('editorials')
  .order('date', 'DESC')
  .all()</code></pre>
            <p>列表页查多篇，详情页按 path 查一篇。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">4 render</p>
            <h2>ContentRenderer 渲染正文</h2>
            <pre><code>&lt;ContentRenderer
  :value="article"
/&gt;</code></pre>
            <p>Vue 页面负责壳、导航和 SEO，Markdown 负责正文内容。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>文章列表</h2>
            <div class="source-card-grid">
              <NuxtLink
                v-for="article in articles"
                :key="article.path"
                class="source-card content-article-card"
                :to="`/learn/markdown-content/${article.path.split('/').at(-1)}`"
              >
                <p class="eyebrow">{{ article.category }} · {{ article.readingTime }}</p>
                <h3>{{ article.title }}</h3>
                <p>{{ article.description }}</p>
                <div class="spec-list">
                  <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
                </div>
              </NuxtLink>
            </div>
          </article>

          <article>
            <h2>查询结果快照</h2>
            <pre><code>{{ articleSnapshot }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Markdown 与 Nuxt Content 学习 - Nuxt Lab',
  description: '通过真实 content 目录、content.config.ts、queryCollection 和 ContentRenderer 学习 Nuxt Content。',
})

const { data: articles } = await useAsyncData('learn-content-editorials', () =>
  queryCollection('editorials')
    .order('date', 'DESC')
    .all(),
)

const articleSnapshot = computed(() =>
  JSON.stringify(
    {
      count: articles.value?.length ?? 0,
      files: articles.value?.map(article => ({
        path: article.path,
        title: article.title,
        heroProduct: article.heroProduct,
        tags: article.tags,
      })) ?? [],
    },
    null,
    2,
  ),
)
</script>
