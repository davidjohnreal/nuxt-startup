<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Protected Route</p>
        <h1>我的订单</h1>
        <p class="lead">
          这个页面使用了 auth 路由中间件。没有登录 token 时，访问它会自动跳回用户中心。
        </p>

        <div class="lesson-steps">
          <article>
            <h2>当前登录态</h2>
            <pre><code>{{ authSnapshot }}</code></pre>
          </article>

          <article>
            <h2>订单列表</h2>
            <div class="settings-grid">
              <div
                v-for="order in orders"
                :key="order.id"
                class="setting-row"
              >
                <span>{{ order.name }}</span>
                <strong>{{ order.status }}</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useSeoMeta({
  title: '我的订单 - Nuxt Lab',
  description: '演示 Nuxt 路由中间件保护客户端私有页面。',
})

const token = ref<string | null>(null)

const orders = [
  { id: 'A1001', name: 'Orion Phone Ultra', status: '已发货' },
  { id: 'A1002', name: 'NovaBook Air', status: '售后处理中' },
  { id: 'A1003', name: 'Pulse Watch Pro', status: '已完成' },
]

const authSnapshot = computed(() =>
  JSON.stringify(
    {
      route: '/account/orders',
      guardedBy: 'auth.ts',
      hasToken: Boolean(token.value),
      tokenPreview: token.value ? `${token.value.slice(0, 12)}...` : null,
    },
    null,
    2,
  ),
)

onMounted(() => {
  token.value = localStorage.getItem('nuxt-lab-token')
})
</script>
