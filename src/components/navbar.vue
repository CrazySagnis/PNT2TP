<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/home">Navbar</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/home" exact
            >Home <span class="sr-only">(current)</span></router-link
          >
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
            data-toggle="dropdown"
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
        <li class="nav-item">
          <button @click="logOut">Cerrar Sesion</button>
          <button @click="logIn">Ir Al Login</button>
        </li>
      </ul>
      <form class="form-inline ml-auto">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function logOut() {
  localStorage.removeItem('usuarioActivo')
  router.push('/login')
}
function logIn() {
  router.push('/login')
}
</script>
