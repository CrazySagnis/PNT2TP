// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from './usuarioStore'

export const useCartStore = defineStore('cartStore', () => {
  const authStore = useAuthStore()

  // Si el usuario está logueado, usamos su ID, si no, 'anonimo'
  const userId = authStore.usuario?.id || 'anonimo'

  // Intentamos recuperar el carrito del localStorage
  const items = ref(JSON.parse(localStorage.getItem(`carrito-${userId}`)) || [])

  // Agregar producto al carrito
  function agregarAlCarrito(producto) {
    items.value.push(producto)
  }

  // Remover un producto del carrito por índice
  function removerDelCarrito(index) {
    if (index >= 0 && index < items.value.length) {
      items.value.splice(index, 1)
    }
  }

  // Vaciar carrito
  function vaciarCarrito() {
    items.value = []
  }

  // Guardar en localStorage automáticamente cada vez que cambian los items
  watch(items, (newVal) => {
    localStorage.setItem(`carrito-${userId}`, JSON.stringify(newVal))
  }, { deep: true })

  return {
    items,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito
  }
})
