import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const usuarioActivo = ref(null)

export function useUsuarioActivo() {
  const router = useRouter()

  onMounted(() => {
    const guardado = localStorage.getItem('usuarioActivo')
    if (guardado) {
      usuarioActivo.value = JSON.parse(guardado)
    }

    window.addEventListener('storage', () => {
      const nuevo = localStorage.getItem('usuarioActivo')
      usuarioActivo.value = nuevo ? JSON.parse(nuevo) : null
    })
  })

  function irAlLogin() {
    router.push('/login')
  }

  function logOut() {
    localStorage.removeItem('usuarioActivo')
    usuarioActivo.value = null
    router.push('/login')
  }

  return {
    usuarioActivo,
    irAlLogin,
    logOut,
  }
}
