// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch, watchEffect } from 'vue'
import { useAuthStore } from './usuarioStore'

export const useCartStore = defineStore('cartStore', () => {
  const authStore = useAuthStore()

  // computed userId (se actualiza al cambiar de usuario)
  const userId = computed(() => authStore.usuario?.id || 'anonimo')

  // items: arranca cargando del localStorage
  const items = ref([])

  //  cada vez que cambia el userId, cargamos su carrito
  watchEffect(() => {
    const storedItems = localStorage.getItem(`carrito-${userId.value}`)
    items.value = storedItems ? JSON.parse(storedItems) : []
  })

  // Agregar producto
  function agregarAlCarrito(producto) {
    items.value.push(producto)
  }

  // Remover por índice
  function removerDelCarrito(index) {
    if (index >= 0 && index < items.value.length) {
      items.value.splice(index, 1)
    }
  }

  // Vaciar carrito
  function vaciarCarrito() {
    items.value = []
  }

  // Guardar en localStorage cada vez que items cambian
  watch(items, (newVal) => {
    localStorage.setItem(`carrito-${userId.value}`, JSON.stringify(newVal))
  }, { deep: true })

  return {
    items,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito
  }
})
