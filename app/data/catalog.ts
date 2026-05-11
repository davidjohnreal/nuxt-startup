export type ProductCategory = 'laptops' | 'phones' | 'wearables' | 'tablets'

export interface ProductItem {
  slug: string
  name: string
  category: ProductCategory
  tagline: string
  summary: string
  hero: string
  year: string
  color: string
  specs: string[]
}

export const categories: Record<ProductCategory, { label: string; description: string }> = {
  laptops: {
    label: '电脑',
    description: '轻薄本、创作本、性能本，强调效率与视觉质感。',
  },
  phones: {
    label: '手机',
    description: '围绕影像、性能、系统体验与工业设计展开。',
  },
  wearables: {
    label: '穿戴设备',
    description: '手表、耳机、健康监测与全天候交互。',
  },
  tablets: {
    label: 'Pad',
    description: '大屏创作、学习、娱乐与多任务协同。',
  },
}

export const products: ProductItem[] = [
  {
    slug: 'nova-book-pro',
    name: 'Nova Book Pro',
    category: 'laptops',
    tagline: '面向创作与效率的旗舰轻薄本',
    summary: '高亮屏、长续航、安静散热和统一的多设备协同体验。',
    hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    year: '2026',
    color: '星河银',
    specs: ['M 系列级别算力思路', '16:10 高亮屏', '全天候续航'],
  },
  {
    slug: 'orion-phone-ultra',
    name: 'Orion Phone Ultra',
    category: 'phones',
    tagline: '以影像和性能为核心的主力旗舰',
    summary: '高帧率体验、夜景影像、端侧智能和精细化机身工艺。',
    hero: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80',
    year: '2026',
    color: '曜石黑',
    specs: ['旗舰影像系统', '高刷 OLED', 'AI 场景增强'],
  },
  {
    slug: 'pulse-watch-s',
    name: 'Pulse Watch S',
    category: 'wearables',
    tagline: '更轻、更稳、更懂健康节奏',
    summary: '全天健康监测、运动记录和消息提醒的轻量入口。',
    hero: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80',
    year: '2026',
    color: '雾面银',
    specs: ['全天健康监测', '运动模式丰富', '轻量化机身'],
  },
  {
    slug: 'nova-pad-air',
    name: 'Nova Pad Air',
    category: 'tablets',
    tagline: '学习、办公、追剧都顺手的大屏设备',
    summary: '适合课堂笔记、内容浏览、手写批注和跨设备流转。',
    hero: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    year: '2026',
    color: '云雾白',
    specs: ['高分辨率屏幕', '手写笔支持', '多窗口协同'],
  },
]

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category)
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
