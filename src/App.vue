<template>
  <div>
    <Navbar />
    <div class="main-content">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/navbar.vue'
import Footer from './components/Footer.vue'
import { useProductosStore } from '@/stores/productosStore'
import { onMounted } from 'vue'

const productosStore = useProductosStore()
onMounted(() => {
  productosStore.cargarProductos()
})
</script>
