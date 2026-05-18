<template>
  <div class="page">
    <section class="section">
      <div class="container support-hero">
        <div>
          <p class="eyebrow">支持页</p>
          <h1>需要帮助？从产品、订单和服务开始</h1>
          <p class="lead">
            支持页是科技官网里很关键的非销售页面，负责承接购买前咨询、购买后服务、说明文档和订单问题。
          </p>
        </div>

        <div class="support-search">
          <label for="support-query">搜索支持内容</label>
          <input
            id="support-query"
            v-model="query"
            type="search"
            placeholder="例如：保修、订单、手机"
          >
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="support-grid">
          <article
            v-for="item in visibleSupportItems"
            :key="item.title"
            class="route-card"
          >
            <p class="eyebrow">{{ item.type }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <NuxtLink :to="item.to">进入</NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '支持 - Nuxt Lab',
  description: '学习真实科技官网中的支持页结构，包含产品帮助、订单服务和购买咨询入口。',
})

const query = ref('')

const supportItems = [
  {
    type: 'Product',
    title: '产品帮助',
    description: '按电脑、手机、穿戴设备和 Pad 查找使用说明与规格信息。',
    to: '/products/phones',
  },
  {
    type: 'Order',
    title: '订单与账户',
    description: '查看登录状态、订单记录和账户中心里的客户端页面动线。',
    to: '/account',
  },
  {
    type: 'Campaign',
    title: '新品购买咨询',
    description: '从当季专题进入主推产品，了解新品组合与推荐路线。',
    to: '/campaigns/spring-launch',
  },
]

const visibleSupportItems = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) {
    return supportItems
  }

  return supportItems.filter(item =>
    `${item.type} ${item.title} ${item.description}`.toLowerCase().includes(keyword),
  )
})
</script>
