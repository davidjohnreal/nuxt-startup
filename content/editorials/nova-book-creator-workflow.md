---
title: Nova Book Pro 创作者工作流
description: 展示官网如何用 Markdown 维护教程、场景文案和内容专题。
category: workflow
date: 2026-05-16
readingTime: 8 min
heroProduct: Nova Book Pro
tags:
  - laptop
  - creator
  - workflow
---

# Nova Book Pro 创作者工作流

产品官网不只有产品参数，还会有大量场景型内容，例如创作者工作流、企业部署指南、教育优惠说明和售后帮助文档。

## 内容结构

一篇典型的场景文章通常包含：

- 使用场景。
- 推荐配置。
- 工作流程。
- 相关产品入口。
- 常见问题。

## 为什么不用普通接口返回 HTML

如果后端直接返回 HTML，前端很难统一样式、目录、SEO 和组件嵌入。Markdown 更像一种源内容格式，Nuxt Content 会把它解析成结构化数据，再交给 `ContentRenderer` 渲染。

```vue
<ContentRenderer v-if="article" :value="article" />
```

## 真实项目中的落点

如果你的官网有帮助中心、产品故事、活动说明、博客、教程文档，这类内容都可以考虑使用 Nuxt Content。它不替代数据库，也不替代 CMS，但它非常适合代码仓库内可版本化的内容。
