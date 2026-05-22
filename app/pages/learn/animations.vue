<template>
  <div class="page" ref="pageRoot">
    <section class="section animation-hero">
      <div class="container hero-grid">
        <div class="hero-copy motion-block">
          <p class="eyebrow">Motion in Nuxt</p>
          <h1>动画交互：CSS、Web Animations API 与 GSAP</h1>
          <p class="lead">
            GSAP 适合“多个元素、多个阶段、需要暂停/反向/重播/精确控制”的动画。Nuxt 中要把依赖 DOM 的动画放进
            <code>onMounted</code>，避免 SSR 阶段访问浏览器对象。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" type="button" @click="replayIntro">
              重播入场
            </button>
            <button class="secondary-btn" type="button" @click="togglePanel">
              {{ isPanelOpen ? '收起面板' : '展开面板' }}
            </button>
          </div>
        </div>

        <div class="motion-stage motion-block">
          <div class="motion-orbit" />
          <div class="motion-device">
            <span />
            <strong>Nuxt Motion</strong>
            <small>{{ motionStatus }}</small>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="route-table">
          <article class="route-card motion-card">
            <p class="eyebrow">CSS</p>
            <h2>轻量状态动画</h2>
            <p>hover、按钮反馈、展开收起、页面过渡，优先用 CSS，成本最低。</p>
          </article>

          <article class="route-card motion-card">
            <p class="eyebrow">GSAP Timeline</p>
            <h2>复杂时间线</h2>
            <p>把多个动画片段串起来，并支持暂停、继续、反向、seek、重播。</p>
          </article>

          <article class="route-card motion-card">
            <p class="eyebrow">GSAP Utils</p>
            <h2>交错与批量控制</h2>
            <p>产品卡片、图标矩阵、列表入场，常用 <code>stagger</code> 做错峰节奏。</p>
          </article>

          <article class="route-card motion-card">
            <p class="eyebrow">ScrollTrigger</p>
            <h2>滚动触发动画</h2>
            <p>适合官网里的章节进入、数字指标出现、产品卖点跟随滚动展开。</p>
          </article>
        </div>

        <div class="lesson-steps">
          <article>
            <h2>展开收起：CSS 负责状态动画</h2>
            <div :class="['motion-panel', { open: isPanelOpen }]">
              <div>
                <p class="eyebrow">Interactive panel</p>
                <h3>真实项目里的小交互</h3>
                <p>
                  这种面板、筛选区、规格抽屉，用 CSS transition 就够了。状态由 Vue 控制，动画由 CSS 接管。
                </p>
              </div>
            </div>
          </article>

          <article class="gsap-lab">
            <div>
              <p class="eyebrow">Timeline controls</p>
              <h2>案例 1：产品发布时间线</h2>
              <p class="summary">
                点击下面的按钮观察时间线。GSAP 的关键价值不是“能动”，而是能把多个阶段组织成一条可控时间线。
              </p>
            </div>

            <div class="timeline-demo" ref="timelineDemo">
              <div class="launch-phone" ref="phoneDemo">
                <span class="phone-camera" />
                <strong>Orion X</strong>
                <small>Launch Edition</small>
              </div>
              <div class="launch-copy">
                <p ref="launchKicker">新一代旗舰芯片</p>
                <h3 ref="launchTitle">更轻，更快，更亮。</h3>
                <div class="launch-specs">
                  <span ref="launchChip">Aero N3</span>
                  <span ref="launchScreen">2K ProMotion</span>
                  <span ref="launchBattery">36h Battery</span>
                </div>
              </div>
            </div>

            <div class="control-row">
              <button type="button" @click="playTimeline">播放</button>
              <button type="button" @click="pauseTimeline">暂停</button>
              <button type="button" @click="reverseTimeline">反向</button>
              <button type="button" @click="restartTimeline">重播</button>
            </div>
            <label class="range-control">
              <span>进度 {{ Math.round(timelineProgress * 100) }}%</span>
              <input
                v-model.number="timelineProgress"
                type="range"
                min="0"
                max="1"
                step="0.01"
                @input="seekTimeline"
              >
            </label>
          </article>

          <article class="gsap-lab">
            <div>
              <p class="eyebrow">Stagger</p>
              <h2>案例 2：产品卡片交错动画</h2>
              <p class="summary">列表、菜单、产品矩阵出现时，错峰比同时出现更自然。</p>
            </div>
            <div class="stagger-grid">
              <button
                v-for="product in demoProducts"
                :key="product"
                ref="staggerItems"
                class="stagger-card"
                type="button"
                @click="pulseCard"
              >
                {{ product }}
              </button>
            </div>
            <div class="control-row">
              <button type="button" @click="shuffleCards">交错入场</button>
              <button type="button" @click="flipCards">翻转强调</button>
            </div>
          </article>

          <article class="gsap-lab">
            <div>
              <p class="eyebrow">Pointer interaction</p>
              <h2>案例 3：鼠标跟随高光</h2>
              <p class="summary">官网 Hero、产品展示区常用这类微交互。这里用 <code>gsap.quickTo</code> 平滑追踪鼠标。</p>
            </div>
            <div class="spotlight-box" ref="spotlightBox" @pointermove="moveSpotlight">
              <div class="spotlight-dot" ref="spotlightDot" />
              <strong>移动鼠标观察高光</strong>
              <span>quickTo 会复用 tween，比每次新建动画更适合高频事件。</span>
            </div>
          </article>

          <article class="gsap-lab scroll-demo" ref="scrollDemo">
            <div>
              <p class="eyebrow">ScrollTrigger</p>
              <h2>案例 4：滚动触发章节</h2>
              <p class="summary">向下滚动到这里时，指标会依次出现。真实官网常用于产品卖点、参数、发布页段落。</p>
            </div>
            <div class="metric-row">
              <div class="metric-card scroll-metric">
                <strong>1.2ms</strong>
                <span>响应延迟</span>
              </div>
              <div class="metric-card scroll-metric">
                <strong>4K</strong>
                <span>显示输出</span>
              </div>
              <div class="metric-card scroll-metric">
                <strong>36h</strong>
                <span>续航时间</span>
              </div>
            </div>
          </article>

          <article>
            <h2>GSAP 当前状态</h2>
            <pre><code>{{ gsapSnapshot }}</code></pre>
          </article>

          <article>
            <h2>Nuxt 里使用 GSAP 的写法</h2>
            <pre><code>onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)
  gsap.timeline()
    .from(phoneEl, { y: 40, opacity: 0 })
    .from(titleEl, { y: 20, opacity: 0 })
})

onBeforeUnmount(() => {
  timeline?.kill()
  gsapContext?.revert()
})</code></pre>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt GSAP 动画交互学习 - Nuxt Lab',
  description: '学习 Nuxt 中的 GSAP 时间线、交错动画、鼠标跟随动画和 ScrollTrigger 滚动触发写法。',
})

type GsapModule = typeof import('gsap')
type GsapInstance = GsapModule['gsap']
type GsapTimeline = ReturnType<GsapInstance['timeline']>
type GsapContext = ReturnType<GsapInstance['context']>

const pageRoot = ref<HTMLElement | null>(null)
const phoneDemo = ref<HTMLElement | null>(null)
const launchKicker = ref<HTMLElement | null>(null)
const launchTitle = ref<HTMLElement | null>(null)
const launchChip = ref<HTMLElement | null>(null)
const launchScreen = ref<HTMLElement | null>(null)
const launchBattery = ref<HTMLElement | null>(null)
const spotlightBox = ref<HTMLElement | null>(null)
const spotlightDot = ref<HTMLElement | null>(null)
const scrollDemo = ref<HTMLElement | null>(null)
const staggerItems = ref<HTMLElement[]>([])

const isPanelOpen = ref(false)
const motionStatus = ref('等待动画')
const gsapAvailable = ref(false)
const animationDriver = ref<'gsap' | 'web-animations'>('web-animations')
const timelineProgress = ref(0)
const demoProducts = ['Phone', 'Pad', 'Watch', 'Book', 'Buds', 'Vision']

let gsapApi: GsapInstance | null = null
let introContext: GsapContext | null = null//    入场动画上下文
let labContext: GsapContext | null = null//    实验动画上下文
let launchTimeline: GsapTimeline | null = null // 案例一的时间线 实例
let quickToX: ((value: number) => void) | null = null //聚光灯元素 X - 鼠标跟随案例
let quickToY: ((value: number) => void) | null = null //聚光灯元素 Y - 鼠标跟随案例

const gsapSnapshot = computed(() =>
  JSON.stringify(
    {
      installed: gsapAvailable.value,
      currentDriver: animationDriver.value,
      package: 'gsap',
      learned: ['timeline', 'stagger', 'quickTo', 'ScrollTrigger', 'cleanup'],
      rule: 'DOM 动画放在 onMounted；离开页面时 kill timeline 或 context.revert()。',
    },
    null,
    2,
  ),
)

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value
}

async function loadGsap() {
  if (gsapApi) {
    return gsapApi
  }

  const imported = await import('gsap')
  gsapApi = imported.gsap
  gsapAvailable.value = true
  animationDriver.value = 'gsap'
  return gsapApi
}

async function replayIntro() {
  await runIntroAnimation()
}

async function runIntroAnimation() {
  if (!pageRoot.value) {
    return
  }

  motionStatus.value = '动画运行中'
  const blocks = Array.from(pageRoot.value.querySelectorAll<HTMLElement>('.motion-block, .motion-card'))

  try {
    const gsap = await loadGsap()
    introContext?.revert()
    introContext = gsap.context(() => {
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: 'power3.out',
          stagger: 0.08,
          onComplete: () => {
            motionStatus.value = 'GSAP 入场完成'
          },
        },
      )
    }, pageRoot.value)
    return
  }
  catch {
    gsapAvailable.value = false
    animationDriver.value = 'web-animations'
  }

  blocks.forEach((block, index) => {
    block.animate(
      [
        { opacity: 0, transform: 'translateY(24px) scale(0.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      {
        duration: 520,
        delay: index * 70,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        fill: 'both',
      },
    )
  })

  window.setTimeout(() => {
    motionStatus.value = 'Web Animations API 完成'
  }, 760)
}

async function setupGsapLab() {
  if (!pageRoot.value) {
    return
  }

  const gsap = await loadGsap()
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  labContext = gsap.context(() => {
    const metrics = Array.from(pageRoot.value?.querySelectorAll<HTMLElement>('.scroll-metric') ?? []) //滚动触发的原元素

    launchTimeline = gsap
      .timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onUpdate: () => {
          timelineProgress.value = Number(launchTimeline?.progress().toFixed(2) ?? 0)
        },
      })
      .fromTo(phoneDemo.value, { y: 46, opacity: 0, rotate: -4 }, { y: 0, opacity: 1, rotate: 0, duration: 0.6 })
      .fromTo(launchKicker.value, { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.32 }, '-=0.25')
      .fromTo(launchTitle.value, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42 }, '-=0.1')
      .fromTo(
        [launchChip.value, launchScreen.value, launchBattery.value],
        { y: 18, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.34, stagger: 0.08 },
        '-=0.1',
      )

    gsap.set(staggerItems.value, { transformPerspective: 800 })
    gsap.fromTo(metrics, {
      y: 36,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: scrollDemo.value,
        start: 'top 75%',
        toggleActions: 'play none none reset',
      },
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.16,
      ease: 'power3.out',
    })

    if (spotlightDot.value) {
      quickToX = gsap.quickTo(spotlightDot.value, 'x', { duration: 0.28, ease: 'power3.out' })
      quickToY = gsap.quickTo(spotlightDot.value, 'y', { duration: 0.28, ease: 'power3.out' })
    }
  }, pageRoot.value)

  restartTimeline()
}

function playTimeline() {
  launchTimeline?.play()
}

function pauseTimeline() {
  launchTimeline?.pause()
}

function reverseTimeline() {
  launchTimeline?.reverse()
}

function restartTimeline() {
  timelineProgress.value = 0
  launchTimeline?.restart()
}

function seekTimeline() {
  launchTimeline?.progress(timelineProgress.value).pause()
}

function shuffleCards() {
  if (!gsapApi) {
    return
  }

  gsapApi.fromTo(
    staggerItems.value,
    { y: 28, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.42, stagger: 0.07, ease: 'back.out(1.7)' },
  )
}

function flipCards() {
  if (!gsapApi) {
    return
  }

  gsapApi.killTweensOf(staggerItems.value)
  gsapApi.fromTo(staggerItems.value, {
    rotateY: 0,
  }, {
    rotateY: 360,
    duration: 0.72,
    stagger: 0.05,
    ease: 'power2.inOut',
    clearProps: 'rotateY',
  })
}

function pulseCard(event: MouseEvent) {
  if (!gsapApi) {
    return
  }

  gsapApi.fromTo(event.currentTarget, { scale: 0.94 }, { scale: 1, duration: 0.36, ease: 'elastic.out(1, 0.35)' })
}

function moveSpotlight(event: PointerEvent) {
  if (!spotlightBox.value || !quickToX || !quickToY) {
    return
  }

  const rect = spotlightBox.value.getBoundingClientRect()
  quickToX(event.clientX - rect.left - 34)
  quickToY(event.clientY - rect.top - 34)
}

function resetSpotlight() {
  if (!spotlightBox.value || !quickToX || !quickToY) {
    return
  }

  const rect = spotlightBox.value.getBoundingClientRect()
  quickToX(rect.width / 2 - 34)
  quickToY(rect.height / 2 - 34)
}

onMounted(async () => {
  await runIntroAnimation()
  await setupGsapLab()
})

onBeforeUnmount(() => {
  launchTimeline?.kill()
  introContext?.revert()
  labContext?.revert()
})
</script>
