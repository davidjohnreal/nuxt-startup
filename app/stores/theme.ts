export const useThemeStore = defineStore('theme', () => {
  const mode = ref<'dark' | 'light'>('dark')
  const dense = ref(false)

  const label = computed(() => mode.value === 'dark' ? '深色主题' : '浅色主题')

  function toggleMode() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  function toggleDense() {
    dense.value = !dense.value
  }

  return {
    dense,
    label,
    mode,
    toggleDense,
    toggleMode,
  }
})
