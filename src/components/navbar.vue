<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold text-warning" to="/home"> TechStore </router-link>

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

          <!-- Categorías -->
          <li
            v-for="categoria in productosStore.categoriasDisponibles"
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

          <!-- Input de búsqueda (con estilo) -->
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

        <!-- Si los productos no cargaron aún -->
        <div v-else class="navbar-text text-light me-auto">Cargando categorías...</div>

        <!-- Botones Admin / Cerrar Sesión -->
        <div class="d-flex gap-2 ms-3">
          <button v-if="puedeVerBoton" class="btn btn-warning" @click="alert('Sos admin!')">
            Admin Button
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

<script setup>
import { useSearchStore } from '@/stores/searchStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'
import { useProductosStore } from '@/stores/productosStore'

const searchStore = useSearchStore()
const authStore = useAuthStore()
const productosStore = useProductosStore()
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
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
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
</style>
