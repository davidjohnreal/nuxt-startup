<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 14 Content Sources</p>
        <h1>内容管理与数据来源：不要把所有内容都塞进同一个地方</h1>
        <p class="lead">
          官网里的内容来源通常混合存在：稳定结构适合本地数据，频繁运营内容适合 CMS，文档型内容适合 Markdown 或 Nuxt Content，运行时业务数据则走后端 API。
        </p>

        <div class="content-source-layout">
          <aside class="content-source-sidebar">
            <article>
              <h2>来源选择口诀</h2>
              <ul>
                <li>改动少、强类型：本地数据。</li>
                <li>运营频繁编辑：CMS。</li>
                <li>长文档、帮助中心：Markdown / Nuxt Content。</li>
                <li>登录、订单、库存、表单：后端 API。</li>
              </ul>
            </article>

            <article>
              <h2>当前筛选</h2>
              <div class="component-toolbar">
                <BasePillButton
                  v-for="option in sourceOptions"
                  :key="option.value"
                  :active="selectedSource === option.value"
                  @select="selectedSource = option.value"
                >
                  {{ option.label }}
                </BasePillButton>
              </div>
            </article>
          </aside>

          <div class="content-source-main">
            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">local import</p>
                <h2>本地数据：直接从 TypeScript 文件读取</h2>
              </div>

              <div class="source-card-grid">
                <article
                  v-for="source in filteredLocalSources"
                  :key="source.kind"
                  class="source-card"
                >
                  <p class="eyebrow">{{ source.title }}</p>
                  <h3>{{ source.bestFor }}</h3>
                  <p>{{ source.notes }}</p>
                  <pre><code>{{ source.examplePath }}</code></pre>
                </article>
              </div>
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">server api</p>
                <h2>后端 API：运行时请求内容</h2>
              </div>

              <div class="link-row">
                <button type="button" @click="refresh">
                  重新请求 API
                </button>
              </div>

              <pre><code>{{ apiSnapshot }}</code></pre>
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">markdown / nuxt content</p>
                <h2>Markdown 思路：内容像文件，页面负责渲染</h2>
              </div>
              <p>
                当前项目先用 TS 对象模拟 Markdown 文章。正式项目可以引入 Nuxt Content，把 `content/**/*.md` 变成可查询内容，再用页面组件渲染标题、目录、正文和 SEO。
              </p>
              <pre><code>content/support/getting-started.md
---
title: 新用户支持指南
description: 适合帮助中心的文档型内容
---</code></pre>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { contentSources, type ContentSourceKind } from '~/data/content-sources'

interface EditorialsResponse {
  source: string
  articles: Array<{
    slug: string
    title: string
    summary: string
    source: ContentSourceKind
    body: string
  }>
}

type SourceFilter = ContentSourceKind | 'all'

useSeoMeta({
  title: '内容管理与数据来源学习 - Nuxt Lab',
  description: '学习 Nuxt 项目中本地数据、CMS、后端 API 与 Markdown / Nuxt Content 的适用场景。',
})

const selectedSource = ref<SourceFilter>('all')

const sourceOptions: Array<{ label: string, value: SourceFilter }> = [
  { label: '全部', value: 'all' },
  { label: '本地数据', value: 'local' },
  { label: 'CMS', value: 'cms' },
  { label: 'Markdown', value: 'markdown' },
]

const apiQuery = computed(() =>
  selectedSource.value === 'all' ? {} : { source: selectedSource.value },
)

const {
  data: editorials,
  pending,
  error,
  refresh,
} = await useFetch<EditorialsResponse>('/api/editorials', {
  key: 'learn-editorials',
  query: apiQuery,
  watch: [selectedSource],
})

const filteredLocalSources = computed(() => {
  if (selectedSource.value === 'all') {
    return contentSources
  }

  return contentSources.filter(source => source.kind === selectedSource.value)
})

const apiSnapshot = computed(() =>
  JSON.stringify(
    {
      pending: pending.value,
      hasError: Boolean(error.value),
      requestedSource: selectedSource.value,
      responseSource: editorials.value?.source,
      articleTitles: editorials.value?.articles.map(article => article.title) ?? [],
    },
    null,
    2,
  ),
)
</script>
