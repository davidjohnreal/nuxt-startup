<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 12 Components</p>
        <h1>组件工程化：把页面拆成可维护的零件</h1>
        <p class="lead">
          真实官网不会把所有逻辑都塞进一个页面。页面负责组织内容，业务组件负责领域表达，基础组件负责通用 UI，composable 负责可复用逻辑。
        </p>

        <div class="component-lab">
          <aside class="component-notes">
            <article>
              <h2>这页拆成了什么</h2>
              <pre><code>app/pages/learn/components.vue
app/components/BasePillButton.vue
app/components/ShowcaseCategoryTabs.vue
app/components/ShowcaseProductList.vue
app/composables/useProductShowcase.ts</code></pre>
            </article>

            <article>
              <h2>你正在看到的关系</h2>
              <ul>
                <li>页面组件：组合页面结构，调用 composable。</li>
                <li>基础组件：`BasePillButton` 只关心按钮外观和点击事件。</li>
                <li>业务组件：分类 Tabs 和产品列表理解产品展示这个业务场景。</li>
                <li>`props` 向下传数据，`emits` 向上传事件，`slots` 让父组件插入自定义内容。</li>
              </ul>
            </article>
          </aside>

          <div class="component-stage">
            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">props + emits</p>
                <h2>分类选择由父页面持有状态</h2>
              </div>

              <ShowcaseCategoryTabs
                v-model="selectedCategory"
                :options="categoryOptions"
              />
            </section>

            <section class="component-panel">
              <div class="section-heading">
                <p class="eyebrow">props + slots</p>
                <h2>产品列表由业务组件渲染，按钮由页面插入</h2>
              </div>

              <ShowcaseProductList
                :products="visibleProducts"
                :category-labels="categoryLabels"
              >
                <template #actions="{ product }">
                  <div class="link-row">
                    <NuxtLink :to="`/products/${product.category}/${product.slug}`">
                      详情
                    </NuxtLink>
                    <button type="button" @click="highlightProduct(product.name)">
                      标记
                    </button>
                  </div>
                </template>
              </ShowcaseProductList>
            </section>

            <section class="component-panel">
              <h2>页面状态快照</h2>
              <pre><code>{{ snapshot }}</code></pre>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '组件工程化学习 - Nuxt Lab',
  description: '学习 Nuxt 中页面组件拆分、业务组件、基础组件、props、emits、slots 与 composables。',
})

const {
  categoryLabels,
  categoryOptions,
  selectedCategory,
  visibleProducts,
} = useProductShowcase()

const highlightedProduct = ref('尚未标记')

function highlightProduct(name: string) {
  highlightedProduct.value = name
}

const snapshot = computed(() =>
  JSON.stringify(
    {
      selectedCategory: selectedCategory.value,
      visibleCount: visibleProducts.value.length,
      highlightedProduct: highlightedProduct.value,
    },
    null,
    2,
  ),
)
</script>
