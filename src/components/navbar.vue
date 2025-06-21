<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useAuthStore } from '@/stores/usuarioStore'
import { useProductosStore } from '@/stores/productosStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

import { Swiper, SwiperSlide } from 'swiper/vue'

// Swiper styles:
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

import MeowWare32 from '@/assets/img/MeowWare32.png'

const searchStore = useSearchStore()
const authStore = useAuthStore()
const productosStore = useProductosStore()
const cartStore = useCartStore()
const router = useRouter()

const estaAutenticado = computed(() => authStore.isAuthenticated)

const puedeVerBoton = computed(() => {
  return authStore.usuario && authStore.usuario.rol !== 'limitado'
})

function seleccionarCategoria(categoria) {
  productosStore.categoriaSeleccionada = categoria
}

function cerrarSesion() {
  authStore.logout()
  cartStore.vaciarCarrito() // 👈 Vacía el carrito al cerrar sesión
  router.push('/login')
}

// 👀 Recarga el carrito cuando cambia el usuario:
watchEffect(() => {
  const userId = authStore.usuario?.id || 'anonimo'
  const storedItems = localStorage.getItem(`carrito-${userId}`)
  cartStore.items = storedItems ? JSON.parse(storedItems) : []
})
</script>


<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm fixed-top">
    <div class="container-fluid">
      <!-- LOGO -->
      <router-link class="navbar-brand fw-bold text-warning d-flex align-items-center" to="/home">
        <img :src="MeowWare32" alt="MeowWare Logo" class="navbar-logo me-2" />
      </router-link>

      <!-- BOTÓN MOBILE -->
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

      <!-- CONTENIDO NAVBAR -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- CATEGORÍAS + BUSCADOR -->
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center gap-2"
          v-if="productosStore.productosCargados"
        >
          <!-- Botón "Todos" -->
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

          <!-- Categorías visibles -->
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

          <!-- Input de búsqueda -->
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

        <!-- Si no hay productos aún -->
        <div v-else class="navbar-text text-light me-auto">
          Cargando categorías...
        </div>

        <!-- CARRITO -->
        <div class="d-flex align-items-center me-3">
          <router-link to="/cart" class="btn btn-outline-primary position-relative">
            🛒
            <span
              v-if="cartStore.items.length > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartStore.items.length }}
            </span>
          </router-link>
        </div>

        <!-- LOGIN / LOGOUT -->
        <div class="d-flex gap-2 ms-3">
          <!-- Botón Admin (opcional) -->
          <button v-if="puedeVerBoton" class="btn btn-warning" @click="alert('Sos admin!')">
            Admin Button
          </button>

          <!-- Botón Cerrar sesión / Login -->
          <button
            v-if="estaAutenticado"
            class="btn btn-outline-danger"
            @click="cerrarSesion"
          >
            Cerrar Sesión
          </button>
          <button
            v-else
            class="btn btn-outline-primary"
            @click="router.push('/login')"
          >
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
