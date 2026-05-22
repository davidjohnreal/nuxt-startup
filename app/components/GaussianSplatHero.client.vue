<template>
  <div ref="host" class="gaussian-hero-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const host = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let frameId = 0
let resizeObserver: ResizeObserver | null = null
let hasRenderableSize = false

function getRenderSize() {
  const hostRect = host.value?.getBoundingClientRect()
  if (hostRect && hostRect.width > 0 && hostRect.height > 0) {
    return {
      width: hostRect.width,
      height: hostRect.height,
    }
  }

  const parentRect = host.value?.parentElement?.getBoundingClientRect()
  if (parentRect && parentRect.width > 0 && parentRect.height > 0) {
    return {
      width: parentRect.width,
      height: parentRect.height,
    }
  }

  return {
    width: window.innerWidth || 1200,
    height: Math.min(window.innerHeight || 760, 760),
  }
}

function createGaussianCloud(rendererInstance: THREE.WebGLRenderer) {
  const particleCount = 68000
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const scales = new Float32Array(particleCount)

  const colorA = new THREE.Color('#7bb3ff')
  const colorB = new THREE.Color('#d8e8ff')
  const colorC = new THREE.Color('#8b5cf6')

  for (let index = 0; index < particleCount; index += 1) {
    const positionIndex = index * 3
    const radius = Math.random() * 8
    const branchAngle = ((index % 5) / 5) * Math.PI * 2
    const spinAngle = radius * 1.85
    const randomX = (Math.random() - 0.5) * 0.82
    const randomY = (Math.random() - 0.5) * 0.7
    const randomZ = (Math.random() - 0.5) * 0.82

    positions[positionIndex] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[positionIndex + 1] = (Math.random() - 0.5) * 4.6 + randomY
    positions[positionIndex + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorA.clone()
    mixedColor.lerp(colorB, radius / 8)
    mixedColor.lerp(colorC, Math.random() * 0.18)

    colors[positionIndex] = mixedColor.r
    colors[positionIndex + 1] = mixedColor.g
    colors[positionIndex + 2] = mixedColor.b
    scales[index] = Math.random()
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

  const material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 24 * rendererInstance.getPixelRatio() },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSize;

      attribute float aScale;
      varying vec3 vColor;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        float angle = uTime * 0.04 + modelPosition.y * 0.15;

        modelPosition.x += sin(angle) * 0.08;
        modelPosition.z += cos(angle) * 0.08;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
        gl_PointSize = uSize * aScale;
        gl_PointSize *= (1.0 / -viewPosition.z);

        vColor = color;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.08 / distanceToCenter - 0.12;
        gl_FragColor = vec4(vColor, strength);
      }
    `,
  })

  const points = new THREE.Points(geometry, material)
  points.position.set(2.5, 0.15, 0)
  points.scale.setScalar(1.35)
  return { points, material }
}

function updateSize() {
  if (!host.value || !renderer || !camera) {
    return
  }

  const { width, height } = getRenderSize()

  hasRenderableSize = true
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.setSize(width, height, false)
}

async function waitForClientPaint() {
  await nextTick()
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

onMounted(async () => {
  if (!host.value) {
    return
  }

  await waitForClientPaint()
  if (!host.value) {
    return
  }

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x07111f, 0.045)

  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
  camera.position.set(0, 2, 14)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  host.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.enablePan = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.45

  const { points, material } = createGaussianCloud(renderer)
  scene.add(points)

  const rings: THREE.Mesh[] = []
  for (let index = 0; index < 3; index += 1) {
    const ringGeometry = new THREE.TorusGeometry(6.2 + index * 1.55, 0.018, 16, 180)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: index % 2 === 0 ? '#7bb3ff' : '#d8e8ff',
      transparent: true,
      opacity: 0.22,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    ring.rotation.y = index * 0.5
    ring.userData.speed = 0.001 + index * 0.0005
    rings.push(ring)
    scene.add(ring)
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  const pointLight = new THREE.PointLight(0x7bb3ff, 18, 100)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  const clock = new THREE.Clock()
  const animate = () => {
    if (!renderer || !scene || !camera || !controls) {
      return
    }

    if (!hasRenderableSize) {
      updateSize()
      frameId = window.requestAnimationFrame(animate)
      return
    }

    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime
    points.rotation.y = elapsedTime * 0.06
    points.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08

    rings.forEach((ring) => {
      ring.rotation.z += Number(ring.userData.speed)
    })

    controls.update()
    renderer.render(scene, camera)
    frameId = window.requestAnimationFrame(animate)
  }

  updateSize()
  resizeObserver = new ResizeObserver(updateSize)
  resizeObserver.observe(host.value)
  window.requestAnimationFrame(updateSize)
  animate()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  controls?.dispose()

  if (renderer?.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  scene?.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
      object.geometry.dispose()
      const material = object.material
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose())
      }
      else {
        material.dispose()
      }
    }
  })

  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  controls = null
})
</script>
