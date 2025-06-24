import { defineStore } from 'pinia'
import { ref, computed, watch, watchEffect } from 'vue'
import { useAuthStore } from './usuarioStore'

export const useCartStore = defineStore('cartStore', () => {
  const authStore = useAuthStore()
  const userId = computed(() => authStore.usuario?.id || 'anonimo')
  const items = ref([])

  watchEffect(() => {
    const storedItems = localStorage.getItem(`carrito-${userId.value}`)
    items.value = storedItems ? JSON.parse(storedItems) : []
  })

  function agregarAlCarrito(producto) {
    items.value.push(producto)
  }

  function removerDelCarrito(index) {
    if (index >= 0 && index < items.value.length) {
      items.value.splice(index, 1)
    }
  }

  function vaciarCarrito() {
    items.value = []
    localStorage.removeItem(`carrito-${userId.value}`)
  }

  function cargarCarritoParaUsuario(nuevoUserId) {
    const storedItems = localStorage.getItem(`carrito-${nuevoUserId}`)
    items.value = storedItems ? JSON.parse(storedItems) : []
  }

  watch(
    items,
    (newVal) => {
      localStorage.setItem(`carrito-${userId.value}`, JSON.stringify(newVal))
    },
    { deep: true },
  )

  return {
    items,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    cargarCarritoParaUsuario,
  }
})
