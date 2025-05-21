import { ref } from 'vue'
import { useRouter } from 'vue-router'


const usuarioActivo = ref(JSON.parse(localStorage.getItem('usuarioActivo')))

export function useUsuarioActivo() {
  const router = useRouter()

  window.addEventListener('storage', () => {
    const nuevo = localStorage.getItem('usuarioActivo')
    usuarioActivo.value = nuevo ? JSON.parse(nuevo) : null
  })

  function irAlLogin() {
    router.push('/login')
  }

  function logOut() {
    localStorage.removeItem('usuarioActivo')
    usuarioActivo.value = null
    router.push('/login')
  }

  
  function setUsuarioActivo(usuario) {
    usuarioActivo.value = usuario
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario))
  }

  return {
    usuarioActivo,
    setUsuarioActivo, 
    irAlLogin,
    logOut,
  }
}
