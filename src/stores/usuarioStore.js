import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from './cartStore'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref(null)

  const isAuthenticated = computed(() => usuario.value !== null)

  function cargarUsuarioGuardado() {
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
      if (usuarioGuardado) {
        usuario.value = usuarioGuardado
      }
    } catch (e) {
      usuario.value = null
    }
  }

  cargarUsuarioGuardado()

  function setUsuario(usuarioData) {
    usuario.value = usuarioData
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
  }

  function logout() {
    const cartStore = useCartStore()

    //cartStore.vaciarCarrito()

    usuario.value = null
    localStorage.removeItem('usuario')
  }

  function tieneAccesoADetalle() {
    return usuario.value && usuario.value.rol.trim() !== 'prueba'
  }

  function tieneAccesoACarrito() {
    return usuario.value && usuario.value.rol.trim() !== 'prueba'
  }
  return {
    usuario,
    isAuthenticated,
    setUsuario,
    logout,
    tieneAccesoADetalle,
    tieneAccesoACarrito,
  }
})
