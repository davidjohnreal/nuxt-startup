<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 16 Deployment</p>
        <h1>部署与上线：把 Nuxt 从本地跑到真实环境</h1>
        <p class="lead">
          Nuxt 部署要先回答一个问题：你的项目上线后还需不需要服务端运行时？这个答案决定你用 `nuxt build`、`nuxt generate`，还是交给 Vercel、Netlify、Cloudflare 这类平台托管。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">Node server</p>
            <h2>适合 SSR、API、BFF、登录等完整能力</h2>
            <pre><code>npm run build
node .output/server/index.mjs</code></pre>
            <p>保留服务端运行时，适合官网、账户中心、后台、需要 server/api 的项目。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Static</p>
            <h2>只保留静态产物</h2>
            <pre><code>npm run generate
部署 .output/public</code></pre>
            <p>适合纯展示页、文档站、活动页。没有服务端能力，但加载轻。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Edge / Serverless</p>
            <h2>把 Nuxt 跑在托管运行时上</h2>
            <pre><code>Vercel / Netlify / Cloudflare
按平台配置适配器</code></pre>
            <p>适合全球分发、自动扩缩容、按请求计费的场景。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">Env</p>
            <h2>生产环境变量不要写死</h2>
            <pre><code>runtimeConfig
.env
.env.production
平台控制台 Secret</code></pre>
            <p>数据库、CMS、外部 API、token、密钥都应该通过环境变量注入。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>第一步：先在本机验证生产构建</h2>
            <p class="summary">
              开发时用的是 `npm run dev`，上线前必须用生产构建跑一遍。生产构建会生成 `.output`，这才是部署目标。
            </p>
            <pre><code>npm run build
node .output/server/index.mjs

# 或者用 Nuxt preview 预览生产产物
npm run preview</code></pre>
          </article>

          <article>
            <h2>你这个项目更适合哪种部署</h2>
            <pre><code>{{ deploymentPlan }}</code></pre>
          </article>

          <article>
            <h2>构建产物说明</h2>
            <pre><code>{{ buildArtifacts }}</code></pre>
          </article>

          <article>
            <h2>常见部署命令</h2>
            <div class="link-row">
              <button type="button" @click="selectedMode = 'node'">
                Node server
              </button>
              <button type="button" @click="selectedMode = 'static'">
                Static
              </button>
              <button type="button" @click="selectedMode = 'edge'">
                Edge / Serverless
              </button>
            </div>
            <pre><code>{{ commandSnapshot }}</code></pre>
          </article>

          <article>
            <h2>部署模式怎么选</h2>
            <div class="source-card-grid">
              <article
                v-for="mode in deployModes"
                :key="mode.name"
                class="source-card"
              >
                <p class="eyebrow">{{ mode.name }}</p>
                <h3>{{ mode.goodFor }}</h3>
                <p>{{ mode.warning }}</p>
              </article>
            </div>
          </article>

          <article>
            <h2>环境变量：开发、构建、运行时要分清</h2>
            <pre><code>{{ envSnapshot }}</code></pre>
            <p class="summary">
              `runtimeConfig` 的私有字段只在服务端可用；`runtimeConfig.public` 会进入客户端 bundle，不能放数据库密码、CMS token、JWT secret。
            </p>
          </article>

          <article>
            <h2>传统服务器部署：Node + Nginx 思路</h2>
            <pre><code># 服务器上
git pull
npm ci
npm run build

# 启动 Nuxt 服务
node .output/server/index.mjs

# Nginx 做反向代理
https://your-domain.com -> http://127.0.0.1:3000</code></pre>
            <p class="summary">
              真实生产环境一般不会裸跑一个终端窗口，通常会用 PM2、systemd、Docker 或平台进程管理来守护 Node 进程。
            </p>
          </article>

          <article>
            <h2>Docker 部署范例</h2>
            <pre><code>FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]</code></pre>
            <p class="summary">
              Docker 的好处是本地、测试、生产环境更一致；注意生产镜像里仍然要通过平台注入环境变量，不要把 `.env` 和密钥打进镜像。
            </p>
          </article>

          <article>
            <h2>静态部署什么时候能用</h2>
            <pre><code>npm run generate

# 生成后部署这个目录
.output/public</code></pre>
            <p class="summary">
              静态部署适合纯展示页、文档、营销页。你的项目包含 `server/api`、数据库、登录和 CMS SDK，所以只能把部分页面预渲染，整体仍更适合 Node/平台 SSR。
            </p>
          </article>

          <article>
            <h2>上线检查清单</h2>
            <pre><code>{{ releaseChecklist }}</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type DeployMode = 'node' | 'static' | 'edge'

useSeoMeta({
  title: 'Nuxt 部署与上线学习 - Nuxt Lab',
  description: '学习 Nuxt 的 Node server、静态部署、Edge/Serverless、环境变量和构建产物。',
})

const selectedMode = ref<DeployMode>('node')

const deploymentPlan = JSON.stringify(
  {
    currentApp: 'Nuxt Lab',
    recommended: 'Node server 或支持 Nuxt SSR 的托管平台',
    reason: '项目包含 server/api、CMS SDK、数据库、登录守卫和 SSR 页面，最适合 Node server 或平台托管 SSR。',
    filesToCare: [
      'nuxt.config.ts',
      '.env',
      'server/api/*',
      '.output/server/index.mjs',
      '.output/public',
    ],
  },
  null,
  2,
)

const buildArtifacts = JSON.stringify(
  {
    '.output/server/index.mjs': '生产 Node 服务入口，Node 部署时运行它',
    '.output/server/chunks': '服务端代码分块，包含 SSR、server/api、Nitro 运行时代码',
    '.output/public': '浏览器可访问的静态资源、预渲染 HTML、payload、客户端 JS/CSS',
    '.nuxt': '开发期和构建期中间产物，不是部署目标',
    'nuxt.config.ts': '决定 routeRules、runtimeConfig、image、content 等行为',
  },
  null,
  2,
)

const commandSnapshot = computed(() => {
  const map: Record<DeployMode, string> = {
    node: `npm run build
node .output/server/index.mjs

特点：
- SSR 正常工作
- server/api 正常工作
- runtimeConfig 私有变量在服务端可用
- 适合数据库、CMS、BFF、登录鉴权`,
    static: `npm run generate
把 .output/public 部署到静态托管

特点：
- 没有长期运行的 Nuxt 服务端
- 不能依赖 server/api 处理运行时请求
- 适合营销页、文档站、纯静态官网`,
    edge: `npm run build
按平台要求发布 .output/server 和 .output/public
在平台控制台注入环境变量

特点：
- 平台托管 Nuxt 服务端运行时
- 自动扩缩容和全球节点更方便
- 要遵守平台对 Node API、文件系统、连接池的限制`,
  }

  return map[selectedMode.value]
})

const deployModes = [
  {
    name: 'VPS / 云服务器',
    goodFor: '你自己掌控 Node、Nginx、数据库网络',
    warning: '需要自己处理进程守护、HTTPS、日志、回滚和安全更新。',
  },
  {
    name: 'Vercel / Netlify',
    goodFor: '快速部署 SSR、预览环境、自动 CI',
    warning: '要注意 Serverless 冷启动、函数限制、数据库连接池和区域选择。',
  },
  {
    name: 'Cloudflare / Edge',
    goodFor: '全球边缘节点、低延迟、缓存能力强',
    warning: '不是所有 Node API 都能用，数据库和 npm 包兼容性要提前验证。',
  },
  {
    name: 'Static hosting',
    goodFor: '纯静态页面、活动页、文档站',
    warning: '不适合依赖 server/api、用户登录、运行时数据库查询的页面。',
  },
]

const envSnapshot = JSON.stringify(
  {
    localDevelopment: '.env 只给本地开发使用',
    production: '在服务器或平台控制台配置环境变量',
    privateRuntimeConfig: [
      'MYSQL_URL',
      'POSTGRES_URL',
      'AUTH_TOKEN_SECRET',
      'CONTENTFUL_DELIVERY_TOKEN',
    ],
    publicRuntimeConfig: [
      'NUXT_PUBLIC_EXTERNAL_API_BASE',
    ],
    rule: '没有 NUXT_PUBLIC_ 前缀、且不在 runtimeConfig.public 里的值，不应该出现在浏览器里。',
  },
  null,
  2,
)

const releaseChecklist = JSON.stringify(
  {
    beforeBuild: [
      '确认 Node 版本，当前项目建议 Node 22.18.0',
      '确认 .env.example 有完整变量说明',
      '确认生产环境变量已经配置在服务器或平台',
    ],
    build: [
      'npm ci',
      'npm run build',
      '本地运行 node .output/server/index.mjs 或 npm run preview 验证',
    ],
    afterDeploy: [
      '检查首页、产品页、账户页、API 是否可访问',
      '检查浏览器 Network 中资源路径是否正确',
      '检查服务端日志和错误告警',
      '检查 SEO title、description、canonical、OG 图',
    ],
    rollback: [
      '保留上一个可运行构建版本',
      '数据库迁移要能回滚或向前兼容',
    ],
  },
  null,
  2,
)
</script>
