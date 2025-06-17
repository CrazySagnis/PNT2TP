import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Details from '../components/Details.vue'
import { useAuthStore } from '../stores/usuarioStore'

function verificarAcceso(to, from, next) {
  const store = useAuthStore()
  if (!store.tieneAccesoADetalle()) {
    alert('Acceso denegado')
    next('/home')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

router.addRoute({
  path: '/',
  redirect: '/login'
})

router.addRoute({
  path: '/login',
  component: Login
})

router.addRoute({
  path: '/home',
  component: Home
})

router.addRoute({
  path: '/details/:id',
  name: 'Details',
  component: Details,
  beforeEnter: verificarAcceso
})

export default router
