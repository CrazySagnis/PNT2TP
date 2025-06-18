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

<style>
body {
  background-image: url('../src/assets/img/BackGroundImg.png'); /* Cambia la ruta según tu estructura */
  background-size: cover; /* o "contain" o "auto" */
  background-repeat: repeat; /* o no-repeat si preferís */
  background-position: center center;
  background-attachment: fixed; /* para que no se mueva al scrollear */
}
</style>
