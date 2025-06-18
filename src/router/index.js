import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Details from '../components/Details.vue'
import Cart from '@/components/Cart.vue'
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

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/details/:id', name: 'Details', component: Details, beforeEnter: verificarAcceso },
  { path: '/cart', name: 'Cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
