<template>
  <div>
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>

nav {
  position: sticky;  
  top: 0;
  width: 100%;
  background-color: white; 
  z-index: 1000; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px 20px;
}

.main-content {
  margin-top: 70px; 
  padding: 20px;
}
</style>