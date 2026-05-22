<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <NuxtLink class="card-link" to="/learn/markdown-content">
          返回 Markdown 列表
        </NuxtLink>

        <article v-if="article" class="content-reader">
          <header class="content-reader-header">
            <p class="eyebrow">{{ article.category }} · {{ article.readingTime }}</p>
            <h1>{{ article.title }}</h1>
            <p class="lead">{{ article.description }}</p>
            <div class="spec-list">
              <span>{{ article.heroProduct }}</span>
              <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
            </div>
          </header>

          <ContentRenderer class="content-prose" :value="article" />
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: article } = await useAsyncData(
  () => `learn-content-editorial-${slug.value}`,
  () => queryCollection('editorials')
    .path(`/editorials/${slug.value}`)
    .first(),
)
console.log('article',article.value)
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Markdown article not found',
  })
}

useSeoMeta({
  title: () => `${article.value?.title ?? 'Markdown 内容'} - Nuxt Lab`,
  description: () => article.value?.description ?? 'Nuxt Content Markdown article',
  ogTitle: () => article.value?.title ?? 'Markdown 内容',
  ogDescription: () => article.value?.description ?? 'Nuxt Content Markdown article',
})
</script>
