<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home">Navbar</router-link>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/home" exact>
              Home <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/link">Link</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/action">Action</router-link>
              <router-link class="dropdown-item" to="/another-action">Another action</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/something-else"
                >Something else here</router-link
              >
            </div>
          </li>

          <li class="nav-item d-flex align-items-center">
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </li>
        </ul>

        <div class="d-flex">
          <button
            v-if="authStore.isAuthenticated"
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

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/usuarioStore'

const authStore = useAuthStore()
const router = useRouter()

function cerrarSesion() {
  authStore.logout()
  router.push('/login')
}
</script>
