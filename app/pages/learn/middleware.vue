<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 10</p>
        <h1>路由中间件与登录守卫</h1>
        <p class="lead">
          Nuxt 可以在进入页面前运行路由中间件。常见用途是登录校验、权限判断、AB 实验、旧地址跳转。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">middleware</p>
            <h2>中间件放在哪里</h2>
            <pre><code>app/middleware/auth.ts</code></pre>
            <p>文件名就是中间件名称。页面中写 middleware: 'auth' 就会使用它。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">client</p>
            <h2>为什么判断 server</h2>
            <pre><code>if (import.meta.server) {
  return
}

const token = localStorage.getItem('nuxt-lab-token')</code></pre>
            <p>中间件名保持 auth，同时避免服务端执行时读取浏览器 API。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">page meta</p>
            <h2>页面如何启用</h2>
            <pre><code>definePageMeta({
  middleware: 'auth',
})</code></pre>
            <p>页面声明自己需要哪个中间件，Nuxt 会在进入页面前执行。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">redirect</p>
            <h2>未登录怎么处理</h2>
            <pre><code>return navigateTo({
  path: '/account',
  query: { redirect: to.fullPath },
})</code></pre>
            <p>跳到登录页，并带上原来想访问的地址，登录后可以回去。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>本节案例</h2>
            <div class="link-row">
              <NuxtLink to="/account">用户中心</NuxtLink>
              <NuxtLink to="/account/orders">访问受保护订单页</NuxtLink>
            </div>
          </article>

          <article>
            <h2>auth.ts</h2>
            <pre><code>export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return
  }

  const token = localStorage.getItem('nuxt-lab-token')

  if (token) {
    return
  }

  return navigateTo({
    path: '/account',
    query: { redirect: to.fullPath },
  })
})</code></pre>
          </article>

          <article>
            <h2>适合使用中间件的场景</h2>
            <pre><code>登录检查
角色权限
页面访问统计
旧 URL 重定向
根据设备或实验分组切换页面</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 路由中间件学习 - Nuxt Lab',
  description: '学习 Nuxt middleware、登录守卫、客户端中间件与页面权限控制。',
})
</script>
