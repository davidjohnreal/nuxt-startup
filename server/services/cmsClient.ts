const cmsEntries = [
  {
    id: 'hero-2026-spring',
    title: 'Spring Launch 主视觉',
    slot: 'home-hero',
    status: 'published',
    updatedAt: '2026-05-01T09:00:00.000Z',
  },
  {
    id: 'support-buying-guide',
    title: '购买咨询入口文案',
    slot: 'support-card',
    status: 'draft',
    updatedAt: '2026-05-12T11:30:00.000Z',
  },
]

export async function getCmsEntries() {
  return cmsEntries
}
