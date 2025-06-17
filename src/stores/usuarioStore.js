import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: function () {
    return {
      usuario: JSON.parse(localStorage.getItem('usuario')) || null,
      isAuthenticated: localStorage.getItem('usuario') !== null
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
      return this.usuario && this.usuario.rol !== 'limitado'
    }
  }
})
