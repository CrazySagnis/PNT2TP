import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: function () {
    let usuarioGuardado = null
    try {
      usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
    } catch (e) {
      usuarioGuardado = null
    }

    return {
      usuario: usuarioGuardado,
      isAuthenticated: usuarioGuardado !== null,
    }
  },

  actions: {
    setUsuario: function (usuarioData) {
      this.usuario = usuarioData
      this.isAuthenticated = true
      localStorage.setItem('usuario', JSON.stringify(usuarioData))
    },

    logout: function () {
      this.usuario = null
      this.isAuthenticated = false
      localStorage.removeItem('usuario')
    },

    tieneAccesoADetalle: function () {
      return this.usuario && this.usuario.rol.trim() !== 'prueba'
    },

    tieneAccesoACarrito: function () {
      return this.usuario && this.usuario.rol.trim() !== 'prueba'
    },
  },
})
