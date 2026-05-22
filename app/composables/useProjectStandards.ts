import type { CommitExample, ProjectStandard, StandardArea } from '~/types/project-standards'

const standards: ProjectStandard[] = [
  {
    area: 'naming',
    title: '文件命名',
    pathExample: 'app/components/ProductCard.vue',
    rule: '组件用 PascalCase，页面目录用路由语义，composable 用 useXxx.ts，server API 用 method 后缀。',
    why: '命名稳定后，自动导入、文件路由、团队搜索和代码评审都会轻松很多。',
  },
  {
    area: 'types',
    title: '类型定义',
    pathExample: 'app/types/project-standards.ts',
    rule: '跨页面、跨组件复用的类型放到 types；只在单页使用的 interface 可以留在页面内。',
    why: '类型边界越清楚，业务对象在页面、组件、接口之间流动时越不容易变形。',
  },
  {
    area: 'eslint',
    title: 'ESLint',
    pathExample: 'eslint.config.mjs',
    rule: '用 Nuxt 官方 ESLint 配置打底，团队规则在同一个配置文件里追加。',
    why: 'ESLint 不是只管格式，它能提前暴露未使用变量、错误导入、潜在 Vue 写法问题。',
  },
  {
    area: 'git',
    title: 'Git 提交习惯',
    pathExample: 'feat(learn): add project standards lesson',
    rule: '一个提交只做一类事，推荐 type(scope): summary，正文说明为什么改。',
    why: '提交记录是项目的时间线，清晰提交能让回滚、排查和协作成本低很多。',
  },
  {
    area: 'boundary',
    title: '组件与页面边界',
    pathExample: 'page -> business component -> base component -> composable/service',
    rule: '页面负责路由和组合，业务组件负责领域 UI，基础组件只负责通用交互，数据处理下沉到 composable 或 service。',
    why: '边界清楚以后，页面不会越写越胖，组件也不会夹带太多页面上下文。',
  },
]

const commitExamples: CommitExample[] = [
  {
    type: 'feat',
    scope: 'learn',
    message: 'feat(learn): add project standards lesson',
  },
  {
    type: 'fix',
    scope: 'auth',
    message: 'fix(auth): redirect logged-in users back to orders',
  },
  {
    type: 'docs',
    scope: 'course',
    message: 'docs(course): mark deployment lesson completed',
  },
  {
    type: 'refactor',
    scope: 'products',
    message: 'refactor(products): move filtering into composable',
  },
  {
    type: 'test',
    scope: 'api',
    message: 'test(api): cover product category query',
  },
  {
    type: 'chore',
    scope: 'deps',
    message: 'chore(deps): update Nuxt content module',
  },
]

export function useProjectStandards() {
  const selectedArea = ref<StandardArea>('naming')

  const selectedStandard = computed(() =>
    standards.find(item => item.area === selectedArea.value) ?? standards[0],
  )

  const standardsSnapshot = computed(() =>
    JSON.stringify(
      {
        selected: selectedStandard.value,
        namingMap: {
          pages: 'kebab-case route directory, for example app/pages/learn/project-standards.vue',
          components: 'PascalCase, for example ProductCard.vue',
          composables: 'useXxx.ts, for example useProjectStandards.ts',
          stores: 'domain store, for example stores/useCartStore.ts',
          serverApi: 'resource.method.ts, for example server/api/auth/login.post.ts',
          types: 'domain types, for example app/types/project-standards.ts',
        },
      },
      null,
      2,
    ),
  )

  return {
    commitExamples,
    selectedArea,
    selectedStandard,
    standards,
    standardsSnapshot,
  }
}
