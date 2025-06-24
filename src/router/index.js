import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Details from '../components/Details.vue'
import Cart from '@/components/Cart.vue'
import Formulario from '../components/Formulario.vue'
import Donaciones from '@/components/Donaciones.vue'
import PanelBI from '@/components/Panelbi.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/panel-bi', name: 'PanelBI', component: PanelBI },

  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
    meta: { requiereAccesoADetalle: true },
  },
  {
    path: '/formulario',
    name: 'Formulario',
    component: Formulario,
    meta: { bloquearLimitado: true },
  },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/donaciones', name: 'Donaciones', component: Donaciones },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('../stores/usuarioStore')
  const authStore = useAuthStore()

  if (to.path === '/login' && authStore.isAuthenticated) {
    return next('/home')
  }

  if (to.meta.requiereAccesoADetalle && (!authStore.usuario || !authStore.tieneAccesoADetalle())) {
    alert('Acceso denegado')
    return next('/home')
  }

  if (to.meta.bloquearLimitado && authStore.usuario?.rol === 'limitado') {
    alert('Acceso restringido')
    return next('/home')
  }

  next()
})

export default router
