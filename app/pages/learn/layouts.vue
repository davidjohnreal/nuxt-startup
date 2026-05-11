<template>
  <section class="lesson-panel">
    <p class="eyebrow">Lesson 01</p>
    <h1>app.vue、layouts、pages 的协作关系</h1>
    <p class="lead">
      这个页面没有使用默认布局，而是通过 definePageMeta 指定了 custom 布局。
      你可以观察顶部导航变少了，页面外壳也和普通产品页不同。
    </p>

    <div class="lesson-steps">
      <article>
        <h2>1. app.vue 是应用入口</h2>
        <pre><code>&lt;template&gt;
  &lt;NuxtLayout&gt;
    &lt;NuxtPage /&gt;
  &lt;/NuxtLayout&gt;
&lt;/template&gt;</code></pre>
      </article>

      <article>
        <h2>2. layouts 决定页面外壳</h2>
        <pre><code>app/layouts/default.vue
app/layouts/custom.vue</code></pre>
      </article>

      <article>
        <h2>3. pages 决定路由内容</h2>
        <pre><code>app/pages/index.vue           -> /
app/pages/learn/layouts.vue   -> /learn/layouts</code></pre>
      </article>

      <article>
        <h2>4. 页面可以自己选择布局</h2>
        <pre><code>&lt;script setup lang="ts"&gt;
definePageMeta({
  layout: 'custom',
})
&lt;/script&gt;</code></pre>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
})

useSeoMeta({
  title: 'Nuxt 布局学习 - Nuxt Lab',
  description: '理解 app.vue、NuxtLayout、NuxtPage、layouts 和 pages 的协作关系。',
})
</script>
