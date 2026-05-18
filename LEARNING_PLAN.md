# Nuxt 学习计划与进度

这个清单用于记录当前项目的学习路线。目标是从 Vue 3 基础出发，逐步掌握 Nuxt 项目的结构、路由、数据、SEO、图片优化、渲染策略与真实官网开发方式。

## 当前进度

当前完成到：**第 13 节：真实产品官网结构**

下一节准备进入：**第 14 节：内容管理与数据来源**

## 学习路线

- [x] 第 01 节：项目结构速览
  - 认识 `app/`、`pages/`、`components/`、`layouts/`、`server/`、`nuxt.config.ts`
  - 理解 Nuxt 与普通 Vue SPA 的目录差异

- [x] 第 02 节：Nuxt 内置组件
  - `NuxtPage`
  - `NuxtLayout`
  - `NuxtLink`
  - `NuxtImg`
  - `NuxtPicture`
  - `ClientOnly`

- [x] 第 03 节：布局系统
  - 默认布局 `default.vue`
  - 自定义布局 `custom.vue`
  - `definePageMeta({ layout: 'custom' })`

- [x] 第 04 节：文件路由与动态路由
  - `pages/products/[category]/index.vue`
  - `pages/products/[category]/[slug].vue`
  - `useRoute()` 读取 `params` 与 `query`

- [x] 第 05 节：导航与路由跳转
  - `NuxtLink`
  - `navigateTo`
  - `useRouter`
  - 查询参数与页面状态同步

- [x] 第 06 节：数据获取
  - `useFetch`
  - `useAsyncData`
  - `$fetch`
  - `pending`、`error`、`refresh`、`watch`、缓存 key

- [x] 第 07 节：Server API
  - `server/api/*.get.ts`
  - `server/api/*.post.ts`
  - `getQuery`
  - `getRouterParam`
  - `readBody`
  - `createError`

- [x] 第 08 节：SEO 与 Head 管理
  - `useSeoMeta`
  - `useHead`
  - Open Graph
  - canonical URL
  - `htmlAttrs`

- [x] 第 09 节：图片优化与渲染策略
  - `NuxtImg`
  - `sizes`
  - `srcset`
  - IPX provider
  - SSR、SSG、CSR、SWR、Hybrid Rendering

- [x] 第 10 节：路由中间件与登录守卫
  - `defineNuxtRouteMiddleware`
  - `*.client.ts` 客户端中间件
  - `definePageMeta({ middleware: 'auth' })`
  - 未登录重定向
  - 登录后回到原页面

- [x] 第 11 节：状态管理
  - `useState`
  - `useState` 与 `ref` 的跨页面差异
  - Pinia
  - 用户状态、购物车、主题设置

- [x] 第 12 节：组件工程化
  - 页面组件拆分
  - 业务组件与基础组件
  - props、emits、slots
  - 组合式函数 `composables`

- [x] 第 13 节：真实产品官网结构
  - 首页 Hero
  - 分类页
  - 详情页
  - 活动专题页
  - 支持页

- [ ] 第 14 节：内容管理与数据来源（下一节）
  - 本地数据
  - CMS
  - 后端 API
  - Markdown / Nuxt Content 思路

- [ ] 第 15 节：性能优化
  - 首屏资源
  - 代码分割
  - 图片策略
  - 缓存策略
  - Lighthouse 观察指标

- [ ] 第 16 节：部署与上线
  - Node server
  - 静态部署
  - Edge / Serverless
  - 环境变量
  - 构建产物

- [ ] 第 17 节：项目规范
  - 文件命名
  - 类型定义
  - ESLint
  - Git 提交习惯
  - 组件与页面边界

- [ ] 第 18 节：综合实战
  - 做一个完整科技企业官网
  - 首页、分类、详情、账户中心、SEO、图片优化、缓存策略
