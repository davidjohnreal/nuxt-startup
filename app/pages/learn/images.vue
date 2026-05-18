<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 08</p>
        <h1>图片和媒体优化</h1>
        <p class="lead">
          科技官网的视觉很依赖图片，但首屏速度也很容易被大图拖慢。Nuxt Image 的目标就是在清晰和体积之间帮你做平衡。
        </p>

        <div class="route-table">
          <article class="route-card">
            <p class="eyebrow">NuxtImg</p>
            <h2>最常用的图片组件</h2>
            <pre><code>&lt;NuxtImg
  src="/hero.jpg"
  alt="产品图"
  width="1200"
  height="900"
  format="webp"
/&gt;</code></pre>
            <p>适合产品卡片、Banner、详情页图片。会帮助你控制尺寸和格式。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">NuxtPicture</p>
            <h2>多格式、多断点图片</h2>
            <pre><code>&lt;NuxtPicture
  src="/hero.jpg"
  sizes="100vw md:50vw"
  :img-attrs="{ alt: 'Hero' }"
/&gt;</code></pre>
            <p>适合首屏主视觉，让不同设备拿到更合适的图片版本。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">width / height</p>
            <h2>避免布局抖动</h2>
            <pre><code>width="1200"
height="900"</code></pre>
            <p>提前告诉浏览器图片比例，页面就不会在图片加载后突然跳动。</p>
          </article>

          <article class="route-card">
            <p class="eyebrow">sizes</p>
            <h2>按设备下载合适尺寸</h2>
            <pre><code>sizes="100vw md:50vw lg:33vw"</code></pre>
            <p>手机拿更小图，桌面拿大一点的图，避免所有设备都下载超大图片。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>产品卡片图：固定比例 + sizes</h2>
            <NuxtImg
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
              alt="Laptop product example"
              class="hero-image"
              width="960"
              height="720"
              sizes="100vw md:50vw lg:33vw"
              format="webp"
            />
          </article>

          <article>
            <h2>首屏图：NuxtPicture 示例</h2>
            <NuxtPicture
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
              sizes="100vw lg:60vw"
              :img-attrs="{
                alt: 'Hero media example',
                class: 'hero-image',
              }"
            />
          </article>

          <article>
            <h2>官网里最常见的图片策略</h2>
            <pre><code>首屏大图：优先控制尺寸、格式、sizes
列表缩略图：固定比例，避免布局抖动
详情页大图：兼顾清晰度和分享图需求
图很多时：减少同时加载的超大图片</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 图片优化学习 - Nuxt Lab',
  description: '学习 NuxtImg、NuxtPicture、width、height、format、sizes 和官网图片优化策略。',
})
</script>
