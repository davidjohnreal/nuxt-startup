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
                <p class="eyebrow">nuxt server api</p>
                <h2>Nuxt 内置 API：可作为页面自己的后端</h2>
              </div>

              <div class="link-row">
                <button type="button" @click="refresh">
                  重新请求 Nuxt API
                </button>
              </div>

              <pre><code>{{ apiSnapshot }}</code></pre>
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">fullstack nuxt</p>
                <h2>Nuxt 自己就是后端：查库、读 CMS、处理表单</h2>
              </div>

              <p>
                这组接口模拟真实分层：`server/api` 只处理 HTTP 入参和响应，具体查询放到 `server/services`，服务再访问数据库、CMS SDK 或其他资源。
              </p>

              <div class="link-row">
                <button type="button" @click="refreshOrders">
                  查订单数据库
                </button>
                <button type="button" @click="refreshCms">
                  读 CMS SDK
                </button>
                <button type="button" @click="submitInquiry">
                  提交表单入库
                </button>
              </div>

              <pre><code>{{ fullstackSnapshot }}</code></pre>
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">mysql / postgresql</p>
                <h2>真实数据库：参数化查询、插入与安全注意事项</h2>
              </div>

              <div class="component-toolbar">
                <BasePillButton
                  v-for="option in dbOptions"
                  :key="option.value"
                  :active="selectedDb === option.value"
                  @select="selectedDb = option.value"
                >
                  {{ option.label }}
                </BasePillButton>
              </div>

              <div class="link-row">
                <button type="button" @click="setupDatabase">
                  建表
                </button>
                <button type="button" @click="insertDatabaseLead">
                  插入一条
                </button>
                <button type="button" @click="queryDatabaseLeads">
                  查询最近记录
                </button>
              </div>

              <pre><code>{{ databaseSnapshot }}</code></pre>
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">external backend</p>
                <h2>正式后端范例：Express API + Nuxt 代理层</h2>
              </div>

              <p>
                真实业务里，内容可能来自 Java、Go、Node、CMS 或 GraphQL 服务。Nuxt 的 `server/api` 常用来做 BFF：隐藏后端地址、补鉴权、合并接口、处理缓存。
              </p>
              <ol class="source-flow-list">
                <li>浏览器请求 Nuxt 的 `/api/external-editorials`。</li>
                <li>Nuxt server API 读取服务端私有配置 `externalApiBase`。</li>
                <li>Nuxt 服务端用 `$fetch` 请求 Express 的 `/editorials`。</li>
                <li>Nuxt 可以在这里补 token、改字段、合并多个接口、统一错误。</li>
                <li>浏览器只拿到 Nuxt 返回的数据，不需要知道真实后端细节。</li>
              </ol>

              <div class="link-row">
                <button type="button" @click="refreshExternal">
                  请求 Nuxt 代理 API
                </button>
                <button type="button" @click="loadBrowserDirect">
                  浏览器直连 Express
                </button>
              </div>

              <pre><code>{{ externalSnapshot }}</code></pre>
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
  count?: number
  articles: Array<{
    id?: string
    slug: string
    title: string
    summary: string
    source: ContentSourceKind
    body: string
  }>
}

interface OrdersResponse {
  source: string
  userId: string
  count: number
  orders: Array<{
    id: string
    product: string
    total: number
    status: string
  }>
}

interface CmsResponse {
  source: string
  count: number
  entries: Array<{
    id: string
    title: string
    slot: string
    status: string
    updatedAt: string
  }>
}

interface InquiryResponse {
  ok: boolean
  source: string
  total: number
  inquiry: {
    id: string
    name: string
    product: string
    message: string
    createdAt: string
  }
}

interface DatabaseResponse {
  ok: boolean
  provider: string
  table?: string
  keyword?: string
  rows?: Array<Record<string, unknown>>
  insertedId?: string | number | null
}

type SourceFilter = ContentSourceKind | 'all'
type DbProvider = 'mysql' | 'postgres'

useSeoMeta({
  title: '内容管理与数据来源学习 - Nuxt Lab',
  description: '学习 Nuxt 项目中本地数据、CMS、后端 API 与 Markdown / Nuxt Content 的适用场景。',
})

const selectedSource = ref<SourceFilter>('all')
const selectedDb = ref<DbProvider>('mysql')
const browserDirectData = ref<EditorialsResponse | null>(null)
const browserDirectError = ref('')
const inquiryResult = ref<InquiryResponse | null>(null)
const inquiryError = ref('')
const databaseResult = ref<DatabaseResponse | null>(null)
const databaseError = ref('')
const config = useRuntimeConfig()

const sourceOptions: Array<{ label: string, value: SourceFilter }> = [
  { label: '全部', value: 'all' },
  { label: '本地数据', value: 'local' },
  { label: 'CMS', value: 'cms' },
  { label: 'Markdown', value: 'markdown' },
]

const dbOptions: Array<{ label: string, value: DbProvider }> = [
  { label: 'MySQL', value: 'mysql' },
  { label: 'PostgreSQL', value: 'postgres' },
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

const {
  data: externalEditorials,
  pending: externalPending,
  error: externalError,
  refresh: refreshExternal,
} = await useFetch<EditorialsResponse>('/api/external-editorials', {
  key: 'learn-external-editorials',
  query: apiQuery,
  watch: [selectedSource],
})

const {
  data: orders,
  pending: ordersPending,
  error: ordersError,
  refresh: refreshOrders,
} = await useFetch<OrdersResponse>('/api/fullstack/orders', {
  key: 'learn-fullstack-orders',
  query: { userId: 'user-ada' },
})

const {
  data: cmsEntries,
  pending: cmsPending,
  error: cmsError,
  refresh: refreshCms,
} = await useFetch<CmsResponse>('/api/fullstack/cms', {
  key: 'learn-fullstack-cms',
})

async function submitInquiry() {
  inquiryError.value = ''

  try {
    inquiryResult.value = await $fetch<InquiryResponse>('/api/fullstack/inquiries', {
      method: 'POST',
      body: {
        name: 'Ada Chen',
        product: 'Orion Phone Ultra',
        message: '想了解企业采购方案',
      },
    })
  }
  catch (error) {
    inquiryResult.value = null
    inquiryError.value = error instanceof Error ? error.message : 'Submit failed'
  }
}

async function setupDatabase() {
  databaseError.value = ''

  try {
    databaseResult.value = await $fetch<DatabaseResponse>('/api/database/setup', {
      method: 'POST',
      body: { provider: selectedDb.value },
    })
  }
  catch (error) {
    databaseResult.value = null
    databaseError.value = error instanceof Error ? error.message : 'Setup failed'
  }
}

async function insertDatabaseLead() {
  databaseError.value = ''

  try {
    databaseResult.value = await $fetch<DatabaseResponse>('/api/database/leads', {
      method: 'POST',
      body: {
        provider: selectedDb.value,
        name: 'Ada Chen',
        product: 'Orion Phone Ultra',
        message: '我想查看企业采购折扣',
      },
    })
  }
  catch (error) {
    databaseResult.value = null
    databaseError.value = error instanceof Error ? error.message : 'Insert failed'
  }
}

async function queryDatabaseLeads() {
  databaseError.value = ''

  try {
    databaseResult.value = await $fetch<DatabaseResponse>('/api/database/leads', {
      query: {
        provider: selectedDb.value,
        keyword: 'Orion',
      },
    })
  }
  catch (error) {
    databaseResult.value = null
    databaseError.value = error instanceof Error ? error.message : 'Query failed'
  }
}

async function loadBrowserDirect() {
  browserDirectError.value = ''

  try {
    browserDirectData.value = await $fetch<EditorialsResponse>('/editorials', {
      baseURL: config.public.externalApiBase,
      query: selectedSource.value === 'all' ? undefined : { source: selectedSource.value },
    })
  }
  catch (error) {
    browserDirectData.value = null
    browserDirectError.value = error instanceof Error ? error.message : 'Request failed'
  }
}

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

const fullstackSnapshot = computed(() =>
  JSON.stringify(
    {
      mockDatabaseOrders: {
        pending: ordersPending.value,
        hasError: Boolean(ordersError.value),
        count: orders.value?.count,
        products: orders.value?.orders.map(order => order.product) ?? [],
      },
      mockCmsSdk: {
        pending: cmsPending.value,
        hasError: Boolean(cmsError.value),
        count: cmsEntries.value?.count,
        slots: cmsEntries.value?.entries.map(entry => `${entry.slot}:${entry.status}`) ?? [],
      },
      formPost: {
        hasResult: Boolean(inquiryResult.value),
        hasError: Boolean(inquiryError.value),
        errorMessage: inquiryError.value,
        lastInquiryId: inquiryResult.value?.inquiry.id,
        total: inquiryResult.value?.total,
      },
    },
    null,
    2,
  ),
)

const databaseSnapshot = computed(() =>
  JSON.stringify(
    {
      provider: selectedDb.value,
      hasResult: Boolean(databaseResult.value),
      hasError: Boolean(databaseError.value),
      errorMessage: databaseError.value,
      response: databaseResult.value,
      safetyNotes: [
        '使用参数化 SQL，不拼接用户输入。',
        '数据库账号要最小权限。',
        '错误信息只在服务端记录，不直接暴露连接串。',
      ],
      envNeedToSet: selectedDb.value === 'mysql'
        ? 'MYSQL_URL=mysql://user:pass@127.0.0.1:3306/nuxt_lab'
        : 'POSTGRES_URL=postgresql://user:pass@127.0.0.1:5432/nuxt_lab',
    },
    null,
    2,
  ),
)

const externalSnapshot = computed(() =>
  JSON.stringify(
    {
      expressServer: config.public.externalApiBase,
      nuxtProxy: {
        pending: externalPending.value,
        hasError: Boolean(externalError.value),
        responseSource: externalEditorials.value?.source,
        count: externalEditorials.value?.count,
        articleTitles: externalEditorials.value?.articles.map(article => article.title) ?? [],
      },
      browserDirect: {
        hasData: Boolean(browserDirectData.value),
        hasError: Boolean(browserDirectError.value),
        errorMessage: browserDirectError.value,
        articleTitles: browserDirectData.value?.articles.map(article => article.title) ?? [],
      },
    },
    null,
    2,
  ),
)
</script>
