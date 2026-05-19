import express from 'express'

const app = express()
const port = Number(process.env.EXTERNAL_API_PORT ?? 4010)

app.use(express.json())

const editorials = [
  {
    id: 'cms-001',
    slug: 'spring-launch-story',
    title: 'Spring Launch 的内容编排',
    source: 'cms',
    summary: '这条内容来自独立 Express 后端，模拟真实 CMS 或业务后端。',
    body: '正式项目里，Nuxt 通常不会直接 import 运营后台的数据，而是通过 HTTP 请求后端接口、CMS SDK 或 GraphQL API 获取。',
  },
  {
    id: 'cms-002',
    slug: 'support-start-guide',
    title: '新用户支持指南',
    source: 'markdown',
    summary: '这条内容模拟由后端聚合 Markdown、CMS 或搜索服务之后返回。',
    body: '如果内容需要权限、搜索、审核、统计或跨端复用，后端接口会比前端本地文件更合适。',
  },
  {
    id: 'cms-003',
    slug: 'product-taxonomy',
    title: '产品分类策略',
    source: 'local',
    summary: '这条内容模拟后端返回的产品分类说明，用于对比本地静态数据。',
    body: '产品分类可以在前端本地维护，也可以由后端配置中心下发，取决于更新频率和管理权归属。',
  },
]

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'external-api' })
})

app.get('/editorials', (request, response) => {
  const source = typeof request.query.source === 'string' ? request.query.source : undefined
  const data = source
    ? editorials.filter(item => item.source === source)
    : editorials

  response.json({
    source: source ?? 'all',
    count: data.length,
    articles: data,
  })
})

app.post('/inquiries', (request, response) => {
  const { name, product, message } = request.body

  if (!name || !product) {
    response.status(400).json({ message: 'name and product are required' })
    return
  }

  response.status(201).json({
    ok: true,
    inquiry: {
      id: `inq-${Date.now()}`,
      name,
      product,
      message: message ?? '',
      createdAt: new Date().toISOString(),
    },
  })
})

app.listen(port, () => {
  console.log(`External API listening on http://127.0.0.1:${port}`)
})
