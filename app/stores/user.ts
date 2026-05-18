export const useUserStore = defineStore('user', () => {
  const name = ref('Ada Chen')
  const email = ref('ada.chen@example.com')
  const membership = ref<'guest' | 'member' | 'pro'>('member')
  const signedIn = ref(true)

  const displayName = computed(() => signedIn.value ? name.value : '访客')

  function signIn() {
    signedIn.value = true
  }

  function signOut() {
    signedIn.value = false
  }

  function toggleMembership() {
    membership.value = membership.value === 'pro' ? 'member' : 'pro'
  }

  return {
    displayName,
    email,
    membership,
    name,
    signedIn,
    signIn,
    signOut,
    toggleMembership,
  }
})
