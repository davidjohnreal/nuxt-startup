<template>
  <div class="page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Lesson 17 Project Standards</p>
        <h1>项目规范：让 Nuxt 项目越写越稳</h1>
        <p class="lead">
          规范不是为了显得正式，而是让多人协作、后期维护、功能扩展都更轻松。这一页把文件命名、类型定义、ESLint、Git 提交和组件边界放在同一个真实 Nuxt 项目里看。
        </p>

        <div class="route-table">
          <article
            v-for="standard in standards"
            :key="standard.area"
            class="route-card"
          >
            <p class="eyebrow">{{ standard.area }}</p>
            <h2>{{ standard.title }}</h2>
            <pre><code>{{ standard.pathExample }}</code></pre>
            <p>{{ standard.rule }}</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>交互查看规范</h2>
            <div class="link-row">
              <button
                v-for="standard in standards"
                :key="standard.area"
                type="button"
                :class="{ active: selectedArea === standard.area }"
                @click="selectedArea = standard.area"
              >
                {{ standard.title }}
              </button>
            </div>
            <pre><code>{{ standardsSnapshot }}</code></pre>
          </article>

          <article>
            <h2>类型定义怎么放</h2>
            <pre><code>app/types/project-standards.ts

export type StandardArea =
  | 'naming'
  | 'types'
  | 'eslint'
  | 'git'
  | 'boundary'

export interface ProjectStandard {
  area: StandardArea
  title: string
  pathExample: string
  rule: string
  why: string
}</code></pre>
            <p class="summary">
              这页真的在使用这个类型文件。跨多个文件复用的业务类型放 `app/types`，只在单文件内使用的小类型可以就近写在页面或组件里。
            </p>
          </article>

          <article>
            <h2>ESLint 在 Nuxt 里通常怎么接</h2>
            <pre><code>// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // 团队规则可以继续写在这里
)</code></pre>
            <p class="summary">
              这个项目已经接入 `@nuxt/eslint`。真实团队里通常会在 CI 里执行 lint，让明显问题在合并前暴露。
            </p>
          </article>

          <article>
            <h2>Git 提交习惯</h2>
            <div class="source-card-grid">
              <div
                v-for="example in commitExamples"
                :key="example.message"
                class="source-card"
              >
                <p class="eyebrow">{{ example.type }} / {{ example.scope }}</p>
                <h3>{{ example.message }}</h3>
              </div>
            </div>
            <pre><code>type(scope): summary

feat: 新功能
fix: 修 bug
docs: 文档
refactor: 重构
test: 测试
chore: 构建、依赖、脚手架杂项</code></pre>
          </article>

          <article>
            <h2>组件与页面边界</h2>
            <pre><code>app/pages/learn/project-standards.vue
  负责页面结构、SEO、组合数据

app/composables/useProjectStandards.ts
  负责规范数据、选中状态、派生快照

app/types/project-standards.ts
  负责跨文件复用类型

app/components/*.vue
  适合沉淀可复用基础组件和业务组件</code></pre>
            <p class="summary">
              一个好判断：如果代码描述“这个页面怎么排版”，留在 page；如果代码描述“这个业务模块怎么工作”，优先放到 component、composable 或 server service。
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 项目规范学习 - Nuxt Lab',
  description: '学习 Nuxt 项目中的文件命名、类型定义、ESLint、Git 提交习惯、组件与页面边界。',
})

const {
  commitExamples,
  selectedArea,
  standards,
  standardsSnapshot,
} = await useProjectStandards()
</script>
