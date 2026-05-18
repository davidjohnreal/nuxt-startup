<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 06</p>
        <h1>server/api 服务端接口</h1>
        <p class="lead">
          Nuxt 的 server/api 目录会自动生成后端接口。你可以在同一个项目里写页面，也可以写 API。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">GET</p>
            <h2>/api/products</h2>
            <pre><code>server/api/products.get.ts</code></pre>
            <p>用于获取产品列表，query 参数通过 getQuery(event) 读取。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Dynamic GET</p>
            <h2>/api/products/:slug</h2>
            <pre><code>server/api/products/[slug].get.ts</code></pre>
            <p>用于获取产品详情，动态参数通过 getRouterParam(event, 'slug') 读取。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">POST</p>
            <h2>/api/inquiries</h2>
            <pre><code>server/api/inquiries.post.ts</code></pre>
            <p>用于提交表单，请求体通过 readBody(event) 读取。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Error</p>
            <h2>createError</h2>
            <pre><code>throw createError({
  statusCode: 400,
  statusMessage: 'Name is required'
})</code></pre>
            <p>用于返回标准错误响应，前端可以在 error 中拿到。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>1. 请求产品列表</h2>
            <div class="link-row">
              <button type="button" @click="loadList">GET /api/products?category=phones</button>
            </div>
            <pre><code>{{ listSnapshot }}</code></pre>
          </article>

          <article>
            <h2>2. 请求产品详情</h2>
            <p class="summary">第二个按钮会故意请求一个不存在的 slug，用来观察 404 错误。</p>
            <div class="link-row">
              <button type="button" @click="loadDetail">GET /api/products/orion-phone-ultra</button>
              <button type="button" @click="loadMissingDetail">GET /api/products/missing-slug</button>
            </div>
            <pre><code>{{ detailSnapshot }}</code></pre>
          </article>

          <article>
            <h2>3. 提交咨询表单</h2>
            <p class="summary">第二个按钮会故意缺字段，用来观察 400 错误。</p>
            <div class="link-row">
              <button type="button" @click="submitInquiry">POST /api/inquiries</button>
              <button type="button" @click="submitInvalidInquiry">POST invalid body</button>
            </div>
            <pre><code>{{ inquirySnapshot }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/data/catalog'

interface ProductsResponse {
  category: string | null
  products: ProductItem[]
}

interface InquiryResponse {
  ok: boolean
  inquiry: {
    id: string
    name: string
    product: string
    message: string
    createdAt: string
  }
}

useSeoMeta({
  title: 'Nuxt server/api 学习 - Nuxt Lab',
  description: '学习 Nuxt server/api、GET、POST、动态 API、getQuery、readBody 和 createError。',
})

const listResult = ref<ProductsResponse | null>(null)
const detailResult = ref<ProductItem | null>(null)
const inquiryResult = ref<InquiryResponse | null>(null)
const requestError = ref<{
  message: string
  statusCode?: number
  statusMessage?: string
} | null>(null)

const listSnapshot = computed(() =>
  JSON.stringify(
    {
      category: listResult.value?.category ?? null,
      count: listResult.value?.products.length ?? 0,
      firstProduct: listResult.value?.products[0]?.name ?? null,
    },
    null,
    2,
  ),
)

const detailSnapshot = computed(() =>
  JSON.stringify(
    {
      name: detailResult.value?.name ?? null,
      slug: detailResult.value?.slug ?? null,
      category: detailResult.value?.category ?? null,
    },
    null,
    2,
  ),
)

const inquirySnapshot = computed(() =>
  JSON.stringify(
    {
      hasError: Boolean(requestError.value),
      error: requestError.value,
      response: inquiryResult.value,
    },
    null,
    2,
  ),
)

async function loadList() {
  requestError.value = null
  listResult.value = await $fetch<ProductsResponse>('/api/products', {
    query: { category: 'phones' },
  })
}

async function loadDetail() {
  requestError.value = null
  detailResult.value = await $fetch<ProductItem>('/api/products/orion-phone-ultra')
}

async function loadMissingDetail() {
  requestError.value = null
  detailResult.value = null

  try {
    await $fetch<ProductItem>('/api/products/missing-slug')
  } catch (error) {
    requestError.value = normalizeError(error)
  }
}

async function submitInquiry() {
  requestError.value = null
  inquiryResult.value = await $fetch<InquiryResponse>('/api/inquiries', {
    method: 'POST',
    body: {
      name: 'Ada',
      product: 'Orion Phone Ultra',
      message: 'I want to learn more about this product.',
    },
  })
}

async function submitInvalidInquiry() {
  requestError.value = null
  inquiryResult.value = null

  try {
    await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        message: 'Missing name and product.',
      },
    })
  } catch (error) {
    requestError.value = normalizeError(error)
  }
}

function normalizeError(error: unknown) {
  if (error && typeof error === 'object') {
    const maybeError = error as {
      message?: string
      statusCode?: number
      statusMessage?: string
      data?: { statusMessage?: string }
    }

    return {
      message: maybeError.message ?? 'Unknown error',
      statusCode: maybeError.statusCode,
      statusMessage: maybeError.statusMessage ?? maybeError.data?.statusMessage,
    }
  }

  return {
    message: 'Unknown error',
  }
}
</script>
