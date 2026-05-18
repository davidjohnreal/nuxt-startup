export type ContentSourceKind = 'local' | 'cms' | 'markdown'

export interface ContentSourceItem {
  kind: ContentSourceKind
  title: string
  owner: string
  bestFor: string
  updateMode: string
  examplePath: string
  notes: string
}

export interface EditorialArticle {
  slug: string
  title: string
  summary: string
  source: ContentSourceKind
  body: string
}

export const contentSources: ContentSourceItem[] = [
  {
    kind: 'local',
    title: '本地数据',
    owner: '前端工程',
    bestFor: '产品枚举、导航配置、固定分类、轻量官网内容',
    updateMode: '随代码发布',
    examplePath: 'app/data/catalog.ts',
    notes: '类型安全、读取快、部署简单，但内容人员不能直接在后台编辑。',
  },
  {
    kind: 'cms',
    title: 'CMS',
    owner: '内容/运营团队',
    bestFor: '活动专题、文章、Banner、可频繁调整的营销内容',
    updateMode: '后台发布，前端通过 API 或 SDK 获取',
    examplePath: 'server/api/editorials.get.ts',
    notes: '适合多人协作和审核流，但需要处理鉴权、缓存、预览和接口稳定性。',
  },
  {
    kind: 'markdown',
    title: 'Markdown / Nuxt Content 思路',
    owner: '工程或技术写作团队',
    bestFor: '帮助文档、更新日志、技术博客、支持中心文章',
    updateMode: '内容文件提交到仓库，构建时或运行时读取',
    examplePath: 'content/support/getting-started.md',
    notes: '写作体验轻，适合文档型内容；正式使用 Nuxt Content 时会有查询、目录和渲染能力。',
  },
]

export const editorialArticles: EditorialArticle[] = [
  {
    slug: 'spring-launch-story',
    title: 'Spring Launch 的内容编排',
    summary: '活动专题页通常来自 CMS，因为文案、主视觉和排序会在发布前频繁调整。',
    source: 'cms',
    body: 'CMS 负责让运营团队独立编辑活动内容，Nuxt 页面负责渲染结构、SEO、缓存策略和跳转动线。',
  },
  {
    slug: 'support-start-guide',
    title: '新用户支持指南',
    summary: '支持中心文章更接近 Markdown 内容，强调目录、正文、代码块和长期维护。',
    source: 'markdown',
    body: 'Markdown 适合稳定、结构化的文档内容。真实项目里可以用 Nuxt Content，把 .md 文件变成可查询的数据集合。',
  },
  {
    slug: 'product-taxonomy',
    title: '产品分类为什么适合本地数据',
    summary: '分类枚举变动少、强依赖类型和路由结构，放在本地数据里更简单可靠。',
    source: 'local',
    body: '像 laptops、phones、wearables、tablets 这类核心枚举会影响路由、导航和 API 参数，放在 TypeScript 文件里能获得类型约束。',
  },
]
