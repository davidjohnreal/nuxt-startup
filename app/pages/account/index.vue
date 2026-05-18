<template>
  <div class="page">
    <section class="section">
      <div class="container account-shell">
        <div class="account-hero">
          <p class="eyebrow">CSR Demo</p>
          <h1>用户中心</h1>
          <p class="lead">
            这个页面在 routeRules 中配置了 ssr: false。它不会在服务端渲染用户私有状态，
            而是在浏览器端读取 token 后再展示账户内容。
          </p>
        </div>

        <div class="account-panel">
          <template v-if="!isReady">
            <p class="summary">正在读取浏览器登录状态...</p>
          </template>

          <template v-else-if="!token">
            <h2>未登录</h2>
            <p class="summary">
              这里用 localStorage 模拟浏览器侧 token。真实项目中可以换成 OAuth、JWT
              或后端会话接口，重点是页面状态由客户端接管。
            </p>
            <button type="button" class="primary-btn" @click="login">
              模拟登录
            </button>
            <p v-if="redirectPath" class="summary">
              登录后会回到：{{ redirectPath }}
            </p>
          </template>

          <template v-else>
            <div class="account-profile">
              <div>
                <p class="eyebrow">Signed in</p>
                <h2>Ada Chen</h2>
                <p class="summary">ada.chen@example.com</p>
              </div>
              <button type="button" class="secondary-btn" @click="logout">
                退出登录
              </button>
            </div>

            <div class="link-row">
              <NuxtLink to="/account/orders">查看我的订单</NuxtLink>
              <NuxtLink to="/learn/middleware">学习路由中间件</NuxtLink>
            </div>

            <div class="settings-grid">
              <label class="setting-row">
                <span>新品通知</span>
                <input v-model="settings.productNews" type="checkbox">
              </label>
              <label class="setting-row">
                <span>活动提醒</span>
                <input v-model="settings.campaignAlerts" type="checkbox">
              </label>
              <label class="setting-row">
                <span>深色外观</span>
                <input v-model="settings.darkMode" type="checkbox">
              </label>
            </div>

            <pre><code>{{ clientSnapshot }}</code></pre>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '用户中心 CSR 示例 - Nuxt Lab',
  description: '演示 Nuxt 中使用 routeRules ssr:false 构建客户端渲染页面。',
})

const token = ref<string | null>(null)
const isReady = ref(false)
const route = useRoute()
const settings = reactive({
  productNews: true,
  campaignAlerts: false,
  darkMode: true,
})

const redirectPath = computed(() => {
  const redirect = route.query.redirect

  return typeof redirect === 'string' && redirect.startsWith('/')
    ? redirect
    : ''
})

const clientSnapshot = computed(() =>
  JSON.stringify(
    {
      rendering: 'CSR only',
      hasToken: Boolean(token.value),
      tokenPreview: token.value ? `${token.value.slice(0, 12)}...` : null,
      settings,
    },
    null,
    2,
  ),
)

onMounted(() => {
  token.value = localStorage.getItem('nuxt-lab-token')
  isReady.value = true
})

function login() {
  token.value = `demo-token-${createDemoToken()}`
  localStorage.setItem('nuxt-lab-token', token.value)

  if (redirectPath.value) {
    navigateTo(redirectPath.value)
  }
}

function logout() {
  token.value = null
  localStorage.removeItem('nuxt-lab-token')
}

function createDemoToken() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
</script>
