  import { createRouter, createWebHistory } from 'vue-router'
  import Login from '../components/Login.vue'
  import Home from '../components/Home.vue'
  import Details from '../components/Details.vue'

  const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/details', name: 'Details', component: Details }


  ]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  export default router
