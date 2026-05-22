---
title: Orion Phone Ultra 选购指南
description: 用 Markdown 管理一篇真实官网风格的产品选购长文。
category: buying-guide
date: 2026-05-18
readingTime: 6 min
heroProduct: Orion Phone Ultra
tags:
  - phone
  - flagship
  - camera
---

# Orion Phone Ultra 选购指南

这类内容在真实科技官网里通常不适合硬编码在 Vue 组件中。它更像一篇可以由运营、编辑、产品经理持续维护的长文，所以适合放进 Markdown 或 CMS。

## 适合谁

Orion Phone Ultra 适合三类用户：

- 经常拍摄视频和照片的内容创作者。
- 需要长续航和高亮屏幕的商务用户。
- 想体验当季旗舰功能的普通消费者。

## 页面为什么适合 Markdown

Markdown 的优势是让内容和页面结构分离。页面组件只负责布局、SEO、导航和渲染，正文内容由 `content/editorials/*.md` 文件维护。

```ts
const article = await queryCollection('editorials')
  .path('/editorials/orion-phone-buying-guide')
  .first()
```

## 官网中的常见组合

真实项目里，一篇选购指南通常会同时关联产品卡片、FAQ、推荐配件和购买入口。正文用 Markdown，交互模块仍然用 Vue 组件，这就是 Nuxt Content 的价值。

> 内容团队写正文，前端团队维护组件，二者不会互相拖累。
