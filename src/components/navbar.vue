<script setup>
import { computed, watchEffect } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useAuthStore } from '@/stores/usuarioStore'
import { useProductosStore } from '@/stores/productosStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

import MeowWare32 from '@/assets/img/MeowWare32.png'

const searchStore = useSearchStore()
const authStore = useAuthStore()
const productosStore = useProductosStore()
const cartStore = useCartStore()
const router = useRouter()

const estaAutenticado = computed(() => authStore.isAuthenticated)

const puedeVerBoton = computed(() => {
  return authStore.usuario && authStore.usuario.rol === 'admin'
})

function seleccionarCategoria(categoria) {
  productosStore.categoriaSeleccionada = categoria
}

function cerrarSesion() {
  authStore.logout()
  cartStore.vaciarCarrito()
  router.push('/login')
}

function irAlCarrito() {
  if (!authStore.isAuthenticated) {
    alert('Por favor iniciá sesión para ver tu carrito.')
    router.push('/login')
  } else {
    router.push('/cart')
  }
}

watchEffect(() => {
  const userId = authStore.usuario?.id || 'anonimo'
  const storedItems = localStorage.getItem(`carrito-${userId}`)
  cartStore.items = storedItems ? JSON.parse(storedItems) : []
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold text-warning d-flex align-items-center" to="/home">
        <img :src="MeowWare32" alt="MeowWare Logo" class="navbar-logo me-2" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center gap-2"
          v-if="productosStore.productosCargados"
        >
          <li class="nav-item">
            <button
              class="btn btn-outline-light btn-sm px-3"
              :class="{ 'active-category': productosStore.categoriaSeleccionada === '' }"
              @click="seleccionarCategoria('')"
            >
              Todos
              <span v-if="productosStore.categoriaSeleccionada === ''">✔️</span>
            </button>
          </li>

          <li
            v-for="categoria in productosStore.categoriasVisibles"
            :key="categoria"
            class="nav-item"
          >
            <button
              class="btn btn-outline-light btn-sm px-3"
              :class="{ 'active-category': productosStore.categoriaSeleccionada === categoria }"
              @click="seleccionarCategoria(categoria)"
            >
              {{ categoria }}
              <span v-if="productosStore.categoriaSeleccionada === categoria">✔️</span>
            </button>
          </li>

          <li class="nav-item d-flex align-items-center ms-3">
            <input
              v-model="searchStore.query"
              class="form-control form-control-sm search-input"
              type="search"
              placeholder="Buscar producto..."
              aria-label="Buscar"
            />
          </li>
        </ul>

        <div v-else class="navbar-text text-light me-auto">Cargando categorías...</div>

        <div
          class="d-flex align-items-center me-3"
          v-if="authStore.usuario && authStore.usuario.rol !== 'prueba'"
        >
          <router-link to="/donaciones" class="btn btn-outline-success"> 🌟 Donar </router-link>
          <button class="btn btn-outline-primary position-relative" @click="irAlCarrito">
            🛒
            <span
              v-if="cartStore.items.length > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartStore.items.length }}
            </span>
          </button>
        </div>

        <div class="d-flex gap-2 ms-3">
          <button v-if="puedeVerBoton" class="btn btn-warning" @click="router.push('/formulario')">
            Cargar Producto
          </button>

          <button v-if="estaAutenticado" class="btn btn-outline-danger" @click="cerrarSesion">
            Cerrar Sesión
          </button>
          <button v-else class="btn btn-outline-primary" @click="router.push('/login')">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
  height: 64px;
  padding: 0 1rem;
}

.navbar .btn {
  transition: all 0.2s ease;
}

.navbar .btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.active-category {
  border-color: #ffc107;
  color: #ffc107 !important;
  font-weight: bold;
}

.search-input {
  min-width: 220px;
  max-width: 300px;
  padding: 6px 12px;
  border-radius: 0.3rem;
  background-color: #212529;
  border: 1px solid #555;
  color: #fff;
}

.search-input::placeholder {
  color: #aaa;
}

.navbar-brand {
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.navbar-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}
</style>
